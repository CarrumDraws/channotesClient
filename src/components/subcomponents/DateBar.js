import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function DateBar({ date }) {
  const { palette, transitions } = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        height: "3rem",
        width: "100%",
        backgroundColor: palette.tertiary.main,
      }}
    >
      <Typography
        variant="large"
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "100%",
          left: "2rem",
          transform: "translate(0%, -100%)",
        }}
      >
        {date}
      </Typography>
    </Box>
  );
}

export default DateBar;
