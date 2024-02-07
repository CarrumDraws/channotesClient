import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ProfPic from "../subcomponents/ProfPic.js";

function Friend({ data }) {
  const { palette, transitions } = useTheme();
  const noteRef = useRef(null);

  let { chan_id, first_name, last_name, username, email, image } = data;

  return (
    <Box
      ref={noteRef}
      sx={{
        position: "relative",
        display: "flex",
        userSelect: "none",
        flexDirection: "row",
        height: "3rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: palette.tertiary.main,
        }}
      >
        <Box
          sx={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
          <ProfPic url={image} initials={first_name[0]} type="m" />
        </Box>
        <Box
          sx={{
            paddingRight: "0.5rem",
          }}
        />
        <Typography
          variant="med"
          noWrap
          sx={{
            flexGrow: "99",
            display: "flex",
            flexDirection: "column",
            paddingRight: "0.5rem",
            justifyContent: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {first_name} {username ? `"${username}" ` : ``}
          {last_name}
        </Typography>
      </Box>
    </Box>
  );
}

export default Friend;
