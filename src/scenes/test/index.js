import React, { useEffect, useState, forwardRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  useTheme,
  Dialog,
  Slide,
  Button,
} from "@mui/material";

import TextInput from "../../components/TextInput/TextInput";
import ButtonSmall from "../../components/Buttons/ButtonSmall";
import ButtonSmallPair from "../../components/Buttons/ButtonSmallPair";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";

// Has to be outside so Transition closes correctly
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Test() {
  const { palette, typography, transitions } = useTheme();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Old Title");

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = formJson.data;
    console.log(data);
    setTitle(data);
    handleClose();
  }

  return (
    <Box>
      <TopbarBuffer />
      <div>
        {title}
        <button onClick={handleOpen}>Show backdrop</button>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              handleSubmit(event);
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="10px"
            borderRadius="22px"
            padding="10px 20px 10px 20px"
            backgroundColor={palette.tertiary.main}
          >
            <Typography
              variant="medBold"
              sx={{
                color: palette.tertiary.text,
              }}
            >
              Edit Title
            </Typography>

            <Typography
              variant="medThin"
              sx={{
                color: palette.tertiary.text,
              }}
            >
              Enter a new title for this note.
            </Typography>

            <TextInput name="data" defaultValue={title} />

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              width="100%"
              justifyContent="space-around"
            >
              <ButtonSmall
                text="Cancel"
                trigFunc={() => {
                  handleClose();
                }}
                outlined
              />
              <ButtonSmall text="Save" type="submit" trigFunc={() => {}} />
            </Box>
          </Box>
        </Dialog>
      </div>
      <NavbarBuffer />
    </Box>
  );
}

export default Test;
