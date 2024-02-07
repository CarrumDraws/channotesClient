import React from "react";
import { Container } from "@mui/material";
// Widget that groups Note objects together.
// Takes in an object of note data.
function Group({ children }) {
  let padding = "10px";
  return (
    <Container
      // Ampersand Use https://stackoverflow.com/a/69665812
      // '>' means 'direct child'
      disableGutters={true} // Disbales default padding
      sx={[
        {
          padding: `${padding}`,
          clipPath: `inset(${padding} ${padding} round 17.5px)`,
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
    </Container>
  );
}

export default Group;
