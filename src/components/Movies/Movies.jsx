import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MoviesList, Pagination, FeaturedMovie } from "..";
import frown from "../../assets/images/frown.png";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 17 : 19;
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data?.results?.length) {
    return (
      <Box>
        <Typography
          style={{
            fontFamily: "epilogue, sans-serif",
            fontSize: "1.5rem",
          }}
          align="center"
        >
          no meowies found
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={frown} alt="no recommendations" width="500px" />
        </Box>
      </Box>
    );
  }
  if (error) {
    console.log("error in Movies.jsx", error);
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
      <FeaturedMovie movie={data.results[0]} />
      <MoviesList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </div>
  );
};

export default Movies;
