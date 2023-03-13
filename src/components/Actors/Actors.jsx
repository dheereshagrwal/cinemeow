import React, { useState } from "react";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useGetActorDetailsQuery, useGetMoviesByActorQuery } from "../../services/TMDB";
import useStyles from "./styles";
import { MoviesList, Pagination } from "..";
const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { data: actor, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorQuery({ id, page });
  const classes = useStyles();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w780/${actor?.profile_path}`} alt={actor?.name} />
        </Grid>

        <Grid item lg={7} xl={8} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="h3" gutterBottom>
            {actor?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born : {new Date(actor?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" paragraph align="justify">
            {actor?.biography || "No Biography Available"}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${actor.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} color="primary" onClick={() => history.goBack()}>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movies && <MoviesList movies={movies} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </>
  );
};

export default Actors;
