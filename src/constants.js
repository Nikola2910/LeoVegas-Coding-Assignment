// It is a good practice to put API keys and sensitive data in the .env files,
// but since all requests are sent form the browser and not from the server, the API key
// will be visible in the network tab anyway
export const API_KEY = "8cac6dec66e09ab439c081b251304443";
export const ENDPOINT = "https://api.themoviedb.org/3";
// It would be better to use Template literals instead of old JS string concatation
export const ENDPOINT_DISCOVER =
  ENDPOINT + "/discover/movie/?api_key=" + API_KEY + "&sort_by=vote_count.desc";
// Fix search query to work as written in the API documentation
export const ENDPOINT_SEARCH = ENDPOINT + "/search/movie?api_key=" + API_KEY;
export const ENDPOINT_MOVIE =
  ENDPOINT + "/movie/507086?api_key=" + API_KEY + "&append_to_response=videos";
