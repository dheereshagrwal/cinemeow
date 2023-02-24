import React from "react";
import useStyles from "./styles";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  console.log(movie, i);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Typography variant="h5" className={classes.title}>
        {movie.title}
      </Typography>
    </Grid>
  );
};

export default Movie;
