import React from "react";
import { Box, Container } from "@mui/material";
// Widget that groups Note objects together.
// Takes in an object of note data.
function Group({ children }) {
  return (
    <Box
      // Ampersand Use https://stackoverflow.com/a/69665812
      // '>' means 'direct child'
      sx={[
        {
          clipPath: `inset(0 0 round 17.5px)`,
          // inset creates a rounded rectangle.
          overflow: "hidden",
        },
        {
          // "All Direct Children"
          "& > * ": {
            marginBottom: "2px",
          },
        },
        {
          "& > :last-child": {
            marginBottom: "0px",
          },
        },
      ]}
    >
      {children}
    </Box>
  );
}

export default Group;
