import React from "react";
import { useTheme, Button } from "@mui/material";

// Small Button used for Pop-Ups
function ButtonSmall({
  outlined = false,
  disabled = false,
  trigFunc,
  text,
  type,
}) {
  const { palette, typography, transitions } = useTheme();
  return (
    <Button
      variant={outlined ? "outlined" : "contained"}
      type={type}
      size="small"
      disableElevation
      sx={{
        width: "40%", // Button Width
        height: "1.5rem",
        fontFamily: typography.small,
        color: outlined ? palette.tertiary.text : palette.secondary.text,
        backgroundColor: outlined
          ? palette.tertiary.main
          : palette.secondary.main,
        borderColor: outlined ? palette.tertiary.text : "none",
        borderRadius: "1rem",
        textTransform: "none", // Disable auto-caps
        // Disable Hover Recolor
        "&:hover": {
          color: outlined ? palette.tertiary.text : palette.secondary.text,
          backgroundColor: outlined
            ? palette.tertiary.main
            : palette.secondary.main,
          borderColor: outlined ? palette.tertiary.text : "none",
        },
      }}
      onClick={() => {
        trigFunc("Data");
      }}
    >
      {text}
    </Button>
  );
}

export default ButtonSmall;
