import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  useTheme,
  Backdrop,
  Slide,
  TextField,
  Input,
  Button,
} from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";

function Test() {
  const { palette, transitions } = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Box>
      <TopbarBuffer />
      <div>
        <button onClick={handleOpen}>Show backdrop</button>
        {/* Background */}
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            direction: "down",
          }}
          open={open}
          onClick={handleClose}
        />
        {/* Foreground */}
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          onClick={handleClose}
          invisible={true}
          TransitionComponent={Transition}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="10px"
            borderRadius="22px"
            padding="20px"
            backgroundColor={palette.tertiary.main}
            sx={{}}
          >
            <Typography
              variant="medBold"
              noWrap
              sx={{
                color: palette.tertiary.text,
              }}
            >
              Edit Title
            </Typography>
            <Typography
              variant="medThin"
              noWrap
              sx={{
                color: palette.tertiary.text,
              }}
            >
              Enter a new title for this note.
            </Typography>
            <TextField
              hiddenLabel
              width="100px"
              id="filled-hidden-label-small"
              defaultValue="Old Title"
              variant="filled"
              size="small"
            />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="15px"
              sx={{}}
            >
              <Button>Hello</Button>
              <Button>World</Button>
            </Box>
          </Box>
        </Backdrop>
      </div>
      <NavbarBuffer />
    </Box>
  );
}

export default Test;
