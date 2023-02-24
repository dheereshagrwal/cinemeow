import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbApiKey = process.env.TMDB_KEY;
const page = 1;
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //Get movies by type
    getMovies: builder.query({
      query: (type) => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
