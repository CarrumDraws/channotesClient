import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import Home from "./scenes/home";
import Login from "./scenes/login";
import Form from "./scenes/login/Form";
import Search from "./scenes/search";
import User from "./scenes/user";
import Error from "./scenes/error";
import Test from "./scenes/test";

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
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="folders"
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={isAuth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="editprofile"
            element={isAuth ? <Form /> : <Navigate to="/login" />}
          />
          <Route
            path="search"
            element={isAuth ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="user/:chan_id"
            element={isAuth ? <User /> : <Navigate to="/login" />}
          />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
