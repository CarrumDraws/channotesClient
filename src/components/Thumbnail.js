import React from "react";
import { Box } from "@mui/material";
function Thumbnail({ type }) {
  let size = type === "l" ? "75px" : type === "m" ? "35px" : "25px";

  return (
    <Box
      sx={{
        height: size,
        width: size,
        backgroundColor: "#8492E0",
        borderRadius: "50%",
      }}
    />
  );
}

export default Thumbnail;
