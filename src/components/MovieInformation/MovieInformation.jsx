import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  Favorite,
  FavoriteBorderOutlined,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { MoviesList } from "..";
import { userSelector } from "../../features/auth";
import frown from "../../assets/images/frown.png";
import { fetchToken } from "../../utils";
const MovieInformation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(userSelector);
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);

  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: isRecommendationsError,
  } = useGetRecommendationsQuery({ movie_id: id, list: "/recommendations" });

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const [isMovieInFavorites, setIsMovieInFavorites] = useState(false);
  const [isMovieInWatchlist, setIsMovieInWatchlist] = useState(false);

  useEffect(() => {
    setIsMovieInFavorites(
      !!favoriteMovies?.results?.find((movie) => movie.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieInWatchlist(
      !!watchlistMovies?.results?.find((movie) => movie.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      { media_type: "movie", media_id: id, favorite: !isMovieInFavorites }
    );
    setIsMovieInFavorites((prev) => !prev);
  };

  const addToWatchlist = () => {
    axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      { media_type: "movie", media_id: id, watchlist: !isMovieInWatchlist }
    );
    setIsMovieInWatchlist((prev) => !prev);
  };

  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error || isRecommendationsError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/"> Something has gone wrong - go back </Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item xs={12} lg={4}>
        <img
          className={`hvr-shadow ${classes.poster}`}
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ fontFamily: "sora, sans-serif" }}
        >
          {data?.title} ({data?.release_date?.split("-")[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {data?.tagline}
        </Typography>
        <br />
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating value={data?.vote_average / 2} readOnly />
            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              style={{
                marginLeft: "10px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {data?.runtime} min |{" "}
            {data?.spoken_languages
              ?.map((language) => language.name)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              to="/"
              key={genre?.name}
              className={classes.links}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre?.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
                alt="genreIcon"
              />
              <Typography
                color="textPrimary"
                variant="subtitle1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <br />
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "10px", fontFamily: "epilogue, sans-serif" }}
        >
          Overview
        </Typography>
        <Typography
          style={{ marginBottom: "2rem", fontFamily: "Montserrat, sans-serif" }}
          gutterBottom
        >
          {data?.overview}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontFamily: "epilogue, sans-serif",
          }}
        >
          Purr-fect Performers
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data?.credits?.cast?.slice(0, 6).map(
              (character, i) =>
                character.profile_path && (
                  <Grid
                    key={i}
                    item
                    xs={4}
                    md={2}
                    component={Link}
                    to={`/actors/${character.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${character?.profile_path}`}
                      alt={character?.name}
                      className={`hvr-shrink ${classes.castImage}`}
                    />
                    <Typography
                      color="textPrimary"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {character?.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {character?.character}
                    </Typography>
                  </Grid>
                )
            )}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="medium">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                  style={{
                    fontFamily: "sora, sans-serif",
                    textTransform: "none",
                  }}
                >
                  website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                  style={{
                    fontFamily: "sora, sans-serif",
                    textTransform: "none",
                  }}
                >
                  IMDb
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  endIcon={<Theaters />}
                  style={{
                    fontFamily: "sora, sans-serif",
                    textTransform: "none",
                  }}
                >
                  trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <br />
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup
                variant="outlined"
                size="medium"
                style={{ fontFamily: "sora, sans-serif" }}
              >
                <Button
                  onClick={isAuthenticated ? addToFavorites : fetchToken}
                  endIcon={
                    !isMovieInFavorites ? (
                      <FavoriteBorderOutlined />
                    ) : (
                      <Favorite />
                    )
                  }
                  style={{
                    fontFamily: "sora, sans-serif",
                    textTransform: "none",
                  }}
                >
                  {isMovieInFavorites ? "unfavorite" : "favorite"}
                </Button>

                <Button
                  onClick={isAuthenticated ? addToWatchlist : fetchToken}
                  endIcon={isMovieInWatchlist ? "-" : "+"}
                  style={{
                    fontFamily: "sora, sans-serif",
                    textTransform: "none",
                  }}
                >
                  watchlist
                </Button>
                <Button
                  sx={{ borderColor: "primary.main" }}
                  endIcon={<ArrowBack />}
                  onClick={() => navigate(-1)}
                  style={{
                    fontFamily: "sora, sans-serif",
                    textTransform: "none",
                  }}
                >
                  back
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          style={{
            fontFamily: "epilogue, sans-serif",
          }}
        >
          {recommendations?.results?.length
            ? "Paw-sibly of interest to you"
            : "No Recommendations"}
        </Typography>
        <br />
        {recommendations?.results?.length ? (
          <MoviesList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={frown}
              alt="no recommendations"
              className={`animate__animated animate__rollIn ${classes.frownImage}`}
            />
          </Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results && (
          <iframe
            autoPlay
            className={classes.video}
            style={{ border: 0 }}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos?.results[0]?.key}`}
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
