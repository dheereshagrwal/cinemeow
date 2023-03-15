import React, { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { useHistory } from "react-router-dom";
import {
  searchMovie,
  selectGenreOrCategory,
} from "../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";
const useAlan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setMode } = useContext(ColorModeContext);
  useEffect(() => {
    alanBtn({
      key: "0c27c2fcbb323b04d12225b1c252b4432e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenreOrCategory") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            history.push("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            history.push("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          history.push("/");
        } else if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
