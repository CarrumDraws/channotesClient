import React from "react";
import Note from "./Note";
import { Container } from "@mui/material";
// Widget that groups Note objects together.
// Takes in an object of note data.
function Notes({ children }) {
  return (
    <Container
      // Ampersand Use https://stackoverflow.com/a/69665812
      // '>' means 'direct child'
      sx={[
        {
          // "All Direct Children"
          "& > * ": {
            marginBottom: "2px",
          },
        },
        {
          // "The First Direct Child (Won't affect grandchildren)"
          "& > :first-of-type": {
            borderRadius: "22.5px 22.5px 0 0",
          },
        },
        {
          "& > :last-child": {
            marginBottom: "0px",
            borderRadius: "0 0 22.5px 22.5px ",
          },
        },
      ]}
    >
      {children}
    </Container>
  );
}

export default Notes;
