import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import readDate from "../helperFuncs/readDate.js";
import { flexbox } from "@mui/system";

function TitleBar({ title, date }) {
  const { palette, transitions } = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      sx={{
        position: "relative",
        height: "4rem",
        width: "100%",
        backgroundColor: palette.tertiary.main,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          width: "100%",
          paddingBottom: "1rem",
        }}
      >
        <Typography
          variant="exSmall"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: palette.tertiary.textSub,
          }}
        >
          {readDate(date)}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "32px",
          }}
        />
        <Typography
          variant="large"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: "32px",
          }}
        />
      </Box>
    </Box>
  );
}

export default TitleBar;
