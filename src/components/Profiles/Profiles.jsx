import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";

const Profiles = () => {
  const { user } = useSelector(userSelector);
  return (
    <Box>
      <h1>Profile</h1>
    </Box>
  );
};

export default Profiles;
