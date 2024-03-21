import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function Title({ title }) {
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
        {title}
      </Typography>
    </Box>
  );
}

export default Title;
