import { fetchMovies } from "../data/moviesSlice";
import { getDiscoverUrl, getSearchUrl } from "../service";

export const fetchSearchMovies = (query, page) => {
  return fetchMovies(getSearchUrl(query, page));
};

export const fetchDiscoverMovies = (page) => {
  return fetchMovies(getDiscoverUrl(page));
};
