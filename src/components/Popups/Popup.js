import React, { useEffect, useState, forwardRef } from "react";
import { Box, Typography, useTheme, Dialog, Slide } from "@mui/material";

// Has to be outside so Transition closes correctly
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({
  isOpen,
  handleClose,
  handleSubmit,
  children,
  title,
  description,
}) {
  const { palette, typography, transitions } = useTheme();

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          handleSubmit(event);
        },
        sx: { borderRadius: "22px" },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="10px"
        padding="10px 20px 10px 20px"
        backgroundColor={palette.tertiary.main}
      >
        <Typography
          variant="medBold"
          sx={{
            color: palette.tertiary.text,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="medThin"
            sx={{
              color: palette.tertiary.text,
            }}
          >
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </Dialog>
  );
}

export default Popup;
