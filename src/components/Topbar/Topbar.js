import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

function Topbar() {
  // page can be home, search, alerts, profile
  const { palette, transitions } = useTheme();

  return (
    <Box
      height="5rem"
      width="100%"
      position="fixed"
      top="0"
      right="0"
      style={{
        background: palette.tertiary.main,
      }}
    ></Box>
  );
}

export default Topbar;
