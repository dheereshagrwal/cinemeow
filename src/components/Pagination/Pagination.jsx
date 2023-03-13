import React from "react";
import { Typography, Button } from "@mui/material";
import useStyles from "./styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  if (totalPages === 1) return null;
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        onClick={handlePrev}
        color="primary"
        className={classes.button}
        type="button"
        disabled={currentPage === 1}
        size="small"
        style={{ fontFamily: "sora, sans-serif" }}
      >
        Prev
      </Button>
      <Typography variant="h5" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        variant="contained"
        onClick={handleNext}
        color="primary"
        className={classes.button}
        type="button"
        disabled={currentPage === totalPages}
        size="small"
        style={{ fontFamily: "sora, sans-serif" }}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
