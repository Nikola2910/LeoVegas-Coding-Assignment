import {
  API_KEY,
  ENDPOINT,
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
} from "../constants";

export const getDiscoverUrl = (page = 1) => {
  return `${ENDPOINT_DISCOVER}&page=${page}`;
};

export const getSearchUrl = (query = "", page = 1) => {
  return `${ENDPOINT_SEARCH}&query=${query}&page=${page}`;
};

export const getMovieUrl = (id) => {
  return `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
};
