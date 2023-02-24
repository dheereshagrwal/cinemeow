import React, { useEffect } from "react";
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
const lightLogo = "https://iili.io/HMoPKzu.png";
const darkLogo = "https://iili.io/HMoiYu9.png";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];
const genres = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Romance", value: "romance" },
];
const Sidebar = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img className={classes.image} src={theme.palette.mode === "light" ? lightLogo : darkLogo} alt="Filmrec logo" />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                  <img src={darkLogo} className={classes.genreImages} height={30} />
                </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {genres.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                  <img src={darkLogo} className={classes.genreImages} height={30} />
                </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
