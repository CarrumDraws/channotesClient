import React, { useEffect, useState, forwardRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";

import EditNoteTitle from "../../components/Popups/EditNoteTitle";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";

function Test() {
  const { palette, typography, transitions } = useTheme();

  const [open, setOpen] = useState(false); // Popup State
  const [text, setText] = useState("Old Title"); // Current Title

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = formJson.data;
    console.log(data);
    setText(data);
    handleClose();
  }

  return (
    <Box>
      <TopbarBuffer />
      <div>
        {text}
        <button onClick={handleOpen}>Show backdrop</button>
        <EditNoteTitle
          isOpen={open}
          handleClose={handleClose}
          defaultValue={text}
          handleSubmit={handleSubmit}
        />
      </div>
      <NavbarBuffer />
    </Box>
  );
}

export default Test;
