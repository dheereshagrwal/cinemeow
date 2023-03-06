import React from "react";
import useStyles from "./styles";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movies/${movie.id}`}>
          <img alt={movie.title} className={classes.image} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `http://placekitten.com/200/300`} />
        </Link>
      </Grow>
      <Typography className={classes.title}>
        {movie.title}
      </Typography>
      <Tooltip disableTouchListener title={`${movie.vote_average}/10`}>
        <div className={classes.rating}>
          <Rating value={movie.vote_average / 2} readOnly precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
