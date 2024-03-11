import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";

import Quill from "quill";
import "quill/dist/quill.snow.css"; // stylesheet included in library
import "./index.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["link", "image"],

  [{ header: 1 }, { header: 2 }, { header: false }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "+1" }], // indent

  [{ size: ["small", false, "large", "huge"] }], // dropdowns
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
];

function Note() {
  const { palette, transitions } = useTheme();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  const [textbox, setTextbox] = useState(null);
  const [getQuery, setQuery] = useSearchParams();

  // useCallback instead of useEffect to make sure wrapperRef is defined
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = ""; // remove children
    const div = document.createElement("div"); // new div
    setTextbox(div);
    wrapper.append(div); // place div IN ref
    new Quill(div, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
  }, []);

  return (
    <>
      <TopbarBuffer />
      <Box id="container" ref={wrapperRef} />
    </>
  );
}

export default Note;
