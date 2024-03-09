import { useSelector } from "react-redux";
import { createTheme } from "@mui/material";
// mui theme settings
export const themeSettings = createTheme({
  palette: {
    primary: {
      main: "#F1C040",
      alt: "#E7A541",
      text: "#281461",
      textSub: "#BD5F08",
    },
    secondary: {
      main: "#281461",
      alt: "#5738B0",
      text: "#FFF4D8",
      textSub: "#8492E0",
    },
    tertiary: {
      main: "#FFF4D8",
      alt: "#D9D9D9",
      text: "#281461",
      textSub: "#8492E0",
      disabled: "#B4AA90",
    },
    quarternary: {
      main: "#8492E0",
      alt: "#A4B2FC",
      text: "#281461",
      textSub: "#FFF4D8",
    },
    action: {
      pin: "#ED6C02",
      share: "#2E7D32",
      move: "#8492E0",
      lock: "#4C46CC",
      delete: "#D32F2F",
    },
  },
  typography: {
    large: {
      fontFamily: ["epilogue", "sans-serif"].join(","),
      fontSize: "1.5rem", // These are REM units.
      fontWeight: 800,
    },
    medBold: {
      fontFamily: ["epilogue", "sans-serif"].join(","),
      fontSize: "1rem",
      fontWeight: 700,
    },
    med: {
      fontFamily: ["epilogue", "sans-serif"].join(","),
      fontSize: "1rem",
      fontWeight: 500,
    },
    medThin: {
      fontFamily: ["epilogue", "sans-serif"].join(","),
      fontSize: "1rem",
      fontWeight: 400,
    },
    small: {
      fontFamily: ["epilogue", "sans-serif"].join(","),
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    exSmall: {
      fontFamily: ["epilogue", "sans-serif"].join(","),
      fontSize: "0.75rem",
      fontWeight: 300,
    },
    // Disabled
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: undefined,
    h5: undefined,
    h6: undefined,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: "0.2s",
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});

export default themeSettings;
