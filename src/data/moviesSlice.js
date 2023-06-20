import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FETCH_STATUS } from "../constants";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.fetchStatus = FETCH_STATUS.success;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = FETCH_STATUS.loading;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = FETCH_STATUS.error;
      });
  },
});

export default moviesSlice;
