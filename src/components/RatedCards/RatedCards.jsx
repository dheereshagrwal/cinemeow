import React from "react";
import { Typography, Box } from "@mui/material";
import { Movie } from "..";
const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        style={{ fontFamily: "epilogue, sans-serif" }}
      >
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
