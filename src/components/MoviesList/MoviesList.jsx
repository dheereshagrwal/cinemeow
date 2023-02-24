import React from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import { Movie } from "..";
const MoviesList = ({ movies }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
    // <div>MoviesList</div>
  );
};

export default MoviesList;
