import React, { useState } from "react";
import { useTheme, TextField } from "@mui/material";
function TextInput({ name, defaultValue }) {
  const { palette, typography, transitions } = useTheme();

  return (
    <TextField
      variant="outlined"
      name={name}
      size="small"
      defaultValue={defaultValue}
      sx={{
        input: {
          height: "0.5rem",
          borderRadius: "1.5rem",
          textAlign: "center",
          fontFamily: typography.med,
          color: palette.tertiary.textSub,
          backgroundColor: palette.tertiary.text,
        },
        "& fieldset": { border: "none" },
      }}
      style={{ width: "100%" }}
    />
  );
}

export default TextInput;
