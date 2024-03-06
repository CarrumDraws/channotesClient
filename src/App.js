import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import Folder from "./scenes/folder";
import Login from "./scenes/login";
import Form from "./scenes/login/Form";
import Search from "./scenes/search";
import User from "./scenes/user";
import Error from "./scenes/error";
import Test from "./scenes/test";

import Topbar from "./components/Topbar/Topbar";
import Navbar from "./components/Navbar/Navbar";

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
        <Topbar />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Folder /> : <Navigate to="/login" />}
          />
          <Route
            path="folders/:folder_id"
            element={isAuth ? <Folder /> : <Navigate to="/login" />}
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
