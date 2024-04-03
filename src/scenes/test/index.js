import React, { useEffect, useState, forwardRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, Fab, SvgIcon } from "@mui/material";

import { ReactComponent as AddNote } from "../../icons/AddNote.svg";
import { ReactComponent as AddFolder } from "../../icons/AddFolder.svg";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";

import NewFolder from "../../components/Popups/FolderPopup";

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

  let buttonStyle = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    transition: "0.2s",
  };

  return (
    <Box>
      <TopbarBuffer />
      <NewFolder
        isOpen={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <Fab
        size="medium"
        color="secondary"
        disableRipple
        sx={{
          boxShadow: "none",
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <SvgIcon
          position="absolute"
          viewBox="0 0 24 27"
          sx={{ ...buttonStyle, width: "1.5rem" }}
        >
          <AddNote
            stroke={palette.secondary.text}
            style={{
              transition: "all .3s linear",
            }}
          />
        </SvgIcon>
      </Fab>
      <Fab
        size="medium"
        color="secondary"
        disableRipple
        sx={{
          boxShadow: "none",
          position: "absolute",
          bottom: 16,
          right: 100,
        }}
      >
        <SvgIcon
          position="absolute"
          viewBox="0 0 25 30"
          sx={{ ...buttonStyle, height: "2rem", width: "4rem" }}
        >
          <AddFolder
            stroke={palette.secondary.text}
            style={{
              transition: "all .3s linear",
            }}
          />
        </SvgIcon>
      </Fab>
      {text}
      <button onClick={handleOpen}>Show backdrop</button>

      <NavbarBuffer />
    </Box>
  );
}

export default Test;
