import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function Selector() {
  const { palette, transitions } = useTheme();
  return (
    <Box
      height="2rem"
      width="100%"
      sx={{
        backgroundColor: palette.quarternary.alt,
      }}
    ></Box>
  );
}

export default Selector;
