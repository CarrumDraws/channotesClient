import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

function EditProfile() {
  const { palette, transitions } = useTheme();
  return (
    <Box
      height="2rem"
      width="3rem"
      sx={{
        backgroundColor: palette.quarternary.alt,
      }}
    ></Box>
  );
}

export default EditProfile;
