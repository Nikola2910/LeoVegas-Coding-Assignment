import { useState, useCallback } from "react";
import { getMovieUrl } from "../service";
import { TRAILER_TYPE } from "../constants";

const useTrailer = (id) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);
  const [videoKey, setVideoKey] = useState();

  const getMovie = useCallback(async () => {
    setIsTrailerLoading(true);
    const URL = getMovieUrl(id);
    setVideoKey(null);

    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === TRAILER_TYPE
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
      setIsOpen(true);
    }
    setIsTrailerLoading(false);
  }, [id]);

  return { isOpen, isTrailerLoading, videoKey, setIsOpen, getMovie };
};

export { useTrailer };
