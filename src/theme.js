import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

// const mode = useSelector((state) => state.mode.value);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode === "light" ? "light" : "dark",
    },
  };
};

export default themeSettings;
