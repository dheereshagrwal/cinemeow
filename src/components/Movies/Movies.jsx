import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MoviesList, Pagination } from "..";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies found
          <br />
          Please search for another movie
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          Error fetching movies
          <br />
          Please try again
        </Typography>
      </Box>
    );
  }
  return (
    <div>
      <MoviesList movies={data} />
      <Pagination />
    </div>
  );
};

export default Movies;
