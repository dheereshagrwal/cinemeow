import React from "react";
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating, collapseClasses } from "@mui/material";
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useGetMovieQuery, useGetRecommendationsQuery } from "../../services/TMDB";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { MoviesList } from "..";

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ movie_id: id, list: "/recommendations" });
  console.log("recommendations", recommendations);
  const isMovieInFavorites = false;
  const isMovieInWatchlist = false;
  const addToFavorites = () => {
    console.log("add to favorites");
  };

  const addToWatchlist = () => {
    console.log("add to watchlist");
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/"> Something has gone wrong - go back </Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item xs={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date?.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating value={data?.vote_average / 2} readOnly />
            <Typography variant="subtitle1" align="center" gutterBottom style={{ marginLeft: "10px" }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min / {data?.spoken_languages?.map((language) => language.name).join(", ")}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link key={genre?.name} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre?.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }} gutterBottom>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast?.slice(0, 6).map(
              (character, i) =>
                character.profile_path && (
                  <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: "none" }}>
                    <img src={`https://image.tmdb.org/t/p/w500${character?.profile_path}`} alt={character?.name} className={classes.castImage} />
                    <Typography color="textPrimary">{character?.name}</Typography>
                    <Typography color="textSecondary">{character?.character}</Typography>
                  </Grid>
                )
            )}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button onClick={addToFavorites} href="#" endIcon={isMovieInFavorites ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieInFavorites ? "Unfavorite" : "Favorite"}
                </Button>
                <Button onClick={addToWatchlist} href="#" endIcon={isMovieInWatchlist ? <Remove /> : <PlusOne />}>
                  watchlist
                </Button>
                <Button sx={{ borderColor: "primary.main" }} endIcon={<ArrowBack />}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: "none" }}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h5" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations?.results?.length ? <MoviesList movies={recommendations} numberOfMovies={12} /> : <Box> No recommendations </Box>}
      </Box>
      {/* <Modal></Modal> */}
    </Grid>
  );
};

export default MovieInformation;
