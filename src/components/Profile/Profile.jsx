import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";
import catHeartbreak from "../../assets/images/cat-heartbreak.png";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavoriteMovies } =
    useGetListQuery({
      listName: "favorite/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });
  const { data: watchlistMovies, refetch: refetchWatchlistMovies } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavoriteMovies();
    refetchWatchlistMovies();
  }, [refetchFavoriteMovies, refetchWatchlistMovies]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          gutterBottom
          style={{
            fontFamily: "sora, sans-serif",
            fontSize: "1.2rem",
          }}
        >
          Meowdy! {user?.username}
        </Typography>
        <Button
          color="inherit"
          onClick={logout}
          sx={{ textTransform: "none" }}
          style={{
            fontFamily: "epilogue, sans-serif",
          }}
        >
          Bye for meow &nbsp;
          <ExitToApp />
        </Button>
      </Box>
      <br />
      <br />
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Box>
          <Typography
            variant="body1"
            style={{
              fontFamily: "epilogue, sans-serif",
            }}
            align="center"
          >
            Paws off! No favorites yet. Add them now.
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={catHeartbreak} alt="no recommendations" width="20%" />
          </Box>
        </Box>
      ) : (
        <Box>
          <RatedCards title="Favorite Meowies" data={favoriteMovies} />
          <RatedCards title="Watchlist Meowies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
