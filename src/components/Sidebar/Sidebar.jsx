import React, { useEffect } from "react";
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
const lightLogo = "https://iili.io/HMoPKzu.png";
const darkLogo = "https://iili.io/HMoiYu9.png";
const Sidebar = () => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img className={classes.image} src={theme.palette.mode === "light" ? lightLogo : darkLogo} alt="Filmrec logo" />
      </Link>
    </>
  );
};

export default Sidebar;
