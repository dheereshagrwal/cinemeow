import React, { useState } from "react";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import { MoviesList, Pagination } from "..";
const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    data: actor,
    isFetching: isActorFetching,
    error: actorError,
  } = useGetActorDetailsQuery(id);
  const {
    data: movies,
    isFetching: isMoviesFetching,
    error: moviesError,
  } = useGetMoviesByActorQuery({ id, page });
  const classes = useStyles();
  if (isActorFetching || isMoviesFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (actorError || moviesError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={`hvr-shadow ${classes.image}`}
            src={`https://image.tmdb.org/t/p/w780/${actor?.profile_path}`}
            alt={actor?.name}
          />
        </Grid>

        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{ fontFamily: "sora, sans-serif" }}
          >
            {actor?.name}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Born : {new Date(actor?.birthday).toDateString()}
          </Typography>
          <Typography
            variant="body1"
            paragraph
            align="justify"
            style={{
              fontFamily: "epilogue, sans-serif",
            }}
          >
            {actor?.biography || "No Biography Available"}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${actor.imdb_id}`}
              style={{ fontFamily: "sora, sans-serif", textTransform: "none" }}
            >
              IMDb
            </Button>
            <Button
              startIcon={<ArrowBack />}
              color="primary"
              onClick={() => navigate(-1)}
              style={{ fontFamily: "sora, sans-serif" }}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          style={{
            fontFamily: "epilogue, sans-serif",
          }}
        >
          Meowies
        </Typography>
        {movies && (
          <MoviesList movies={movies} numberOfMovies={12} />
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
