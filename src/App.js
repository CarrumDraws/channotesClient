import { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import Home from "./scenes/homePage";
import Login from "./scenes/loginPage";
import Form from "./scenes/loginPage/Form";

import themeSettings from "./theme";

function App() {
  const isAuth = Boolean(useSelector((state) => state.chan_token));

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Box
      className="App"
      sx={{
        // Global colors, transitions etc here!
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: theme.transitions.create(
          ["color", "background-color", "transform"],
          {
            duration: theme.transitions.duration.standard,
          }
        ),
      }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/editprofile"
              element={isAuth ? <Form /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
