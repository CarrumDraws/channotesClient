import React from "react";
import { Box } from "@mui/material";
// Widget that groups Note objects together.
// Takes in an object of note data.
function Group({ children }) {
  return (
    <Box
      // Ampersand Use https://stackoverflow.com/a/69665812
      // '>' means 'direct child'
      sx={[
        {
          // inset creates a rounded rectangle.
          clipPath: `inset(0 0 round 22.5px)`,
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
