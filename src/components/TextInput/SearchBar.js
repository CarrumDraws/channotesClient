import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

function SearchBar() {
  // page can be home, search, alerts, profile
  const { palette, transitions } = useTheme();

  return (
    <Box
      height="1.5rem"
      width="100%"
      style={{
        background: palette.tertiary.main,
        borderRadius: "0.75rem 0.75rem 0.75rem 0.75rem",
      }}
    >
      <Typography
        variant="small"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: palette.tertiary.textSub,
        }}
      ></Typography>
    </Box>
  );
}

export default SearchBar;
