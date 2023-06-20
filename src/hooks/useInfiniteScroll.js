import { useState, useCallback, useRef } from "react";

const useInfiniteScroll = (isFetching) => {
  const [shouldLoadMoreMovies, setShouldLoadMoreMovies] = useState(false);

  const observer = useRef(null);

  const loadMoreElementRef = useCallback(
    (node) => {
      if (isFetching || !window.IntersectionObserver) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setShouldLoadMoreMovies(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching]
  );

  return { shouldLoadMoreMovies, setShouldLoadMoreMovies, loadMoreElementRef };
};

export { useInfiniteScroll };
