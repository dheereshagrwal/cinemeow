import React from "react";
import { Typography, Button } from "@mui/material";
import useStyles from "./styles";

const Pagination = () => {
  const classes = useStyles();
  const currentPage = 1;
  return (
    <div className={classes.container}>
      <Button variant="contained" color="primary" className={classes.button} type="button">
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button variant="contained" color="primary" className={classes.button} type="button">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
