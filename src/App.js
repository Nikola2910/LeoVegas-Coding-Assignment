import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";

import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { getDiscoverUrl, getSearchUrl } from "./service";
import { fetchSearchMovies, fetchDiscoverMovies } from "./helpers";
import { FIRST_PAGE, FETCH_STATUS } from "./constants";

import "reactjs-popup/dist/index.css";
import "./app.scss";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [page, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const { shouldLoadMoreMovies, setShouldLoadMoreMovies, loadMoreElementRef } =
    useInfiniteScroll(isFetching);

  useEffect(() => {
    if (movies.fetchStatus === FETCH_STATUS.success) {
      setData(movies.movies.results);
    }
  }, [movies]);

  const handleNextPage = () => setPage(page + 1);

  const getSearchResults = (query) => {
    // I would suggest implementing some library like axios for setting timeout before sending request so we do not
    // send a request on every key stroke but rather have some short interval before sending it
    // We can also add manually setTimeout but the first option gives us also the possibility to add some other features
    // like interceptors, etc...
    if (!!query) {
      dispatch(fetchSearchMovies(query, page));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchDiscoverMovies(page));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    getSearchResults(query);
    // This is added so we can reset the page number to first one when we type something in the search input
    setPage(FIRST_PAGE);
  };

  const fetchMoreMovies = async () => {
    if (!data) {
      return;
    }
    setIsFetching(true);

    const URL = !searchQuery
      ? getDiscoverUrl(page)
      : getSearchUrl(searchQuery, page);

    const newMovies = await fetch(URL).then((response) => response.json());
    setData([...data, ...newMovies.results]);
    setIsFetching(false);
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchMovies(searchQuery, FIRST_PAGE));
      handleNextPage();
    } else {
      dispatch(fetchDiscoverMovies(FIRST_PAGE));
      handleNextPage();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (shouldLoadMoreMovies) {
      handleNextPage();
      fetchMoreMovies();
      setShouldLoadMoreMovies(false);
    }
  }, [shouldLoadMoreMovies]);

  return (
    <div className="App">
      <Header location={location} searchMovies={searchMovies} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Movies movies={data} />
                {/* This check is added so we don't have this element until the firs load is finished */}
                {!!data && (
                  <div ref={loadMoreElementRef}>
                    {isFetching ? "Loading More Movies..." : "Load More"}
                  </div>
                )}
              </>
            }
          />
          {/* Removed viewTrailer from Movies, Starred and WatchLater since it is used as a hook
          in Movie component */}
          {/* Starred and WatchLater can be created as one reusable component e.g. Collection
          and then based on type Starred | WatchLater it will have required functions and text */}
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
