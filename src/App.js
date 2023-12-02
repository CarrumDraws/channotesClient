import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import Home from "./scenes/homePage";
import Login from "./scenes/loginPage";
import Form from "./scenes/loginPage/Form";

function App() {
  const isAuth = Boolean(useSelector((state) => state.chan_token));

  const { palette, transitions } = useTheme();

  return (
    <Box
      className="App"
      sx={{
        // Global colors, transitions etc here!
        backgroundColor: palette.primary.main,
        color: palette.primary.text,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/editprofile"
            element={isAuth ? <Form /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
