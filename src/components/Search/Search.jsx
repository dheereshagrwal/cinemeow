import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import {
  clearSelectedGenreOrCategory,
  searchMovie,
} from "../../features/currentGenreOrCategory";
const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
      dispatch(clearSelectedGenreOrCategory());
      navigate("/");
    }
  };
  return (
    <div className={classes.searchContainer}>
      <TextField
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        onKeyPress={handleKeyPress}
        value={query}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
