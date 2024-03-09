import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "./state";

import Folder from "./scenes/folder";
import Note from "./scenes/note";
import Login from "./scenes/login";
import Form from "./scenes/login/Form";
import Search from "./scenes/search";
import User from "./scenes/user";
import Error from "./scenes/error";
import Test from "./scenes/test";

import Topbar from "./components/Topbar/Topbar";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.chan_token));
  const mode = useSelector((state) => state.mode);
  const { palette, transitions } = useTheme();

  useEffect(() => {
    let path = location.pathname.split("/")[1];
    if (path === "" || path === "folder") {
      dispatch(
        setMode({
          mode: "light",
        })
      );
    } else {
      dispatch(
        setMode({
          mode: "dark",
        })
      );
    }
  }, [location]);

  return (
    <Box
      height="100%"
      width="100%"
      sx={{
        margin: 0,
        padding: 0,
        backgroundColor:
          mode === "light" ? palette.primary.main : palette.quarternary.main,
        transition:
          transitions.duration.short + " " + transitions.easing.easeIn,
      }}
    >
      <Topbar />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Folder /> : <Navigate to="/login" />}
        />
        <Route
          path="folder/:folder_id"
          element={isAuth ? <Folder /> : <Navigate to="/login" />}
        />
        <Route
          path="note/:note_id"
          element={isAuth ? <Note /> : <Navigate to="/login" />}
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
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Box>
  );
}

export default App;
