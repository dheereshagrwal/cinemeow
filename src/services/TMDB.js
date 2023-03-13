import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //Get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //Get movies by search query
        if (searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
        }
        //Get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
        }
        //Get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?api_key=${tmdbApiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`;
        }
        //Get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,
    }),

    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    // get user specific recommendations
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
    //get actor details
    getActorDetails: builder.query({
      query: (id) =>
        `person/${id}?api_key=${tmdbApiKey}&append_to_response=images,credits`,
    }),
    //get movies by actor
    getMoviesByActor: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&api_key=${tmdbApiKey}&page=${page}`,
    }),

    //get profile details
    getUserProfileDetails: builder.query({
      query: ({ accountId, sessionId }) =>
        `account/${accountId}?api_key=${tmdbApiKey}&session_id=${sessionId}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
  useGetListQuery,
  useGetUserProfileDetailsQuery,
} = tmdbApi;
