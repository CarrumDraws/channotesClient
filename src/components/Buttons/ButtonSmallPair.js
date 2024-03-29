import React from "react";
import { useTheme, Button, Box } from "@mui/material";
import ButtonSmall from "./ButtonSmall";

function ButtonSmallPair({
  leftText = "Cancel",
  rightText = "Ok",
  leftFunc = () => {},
  rightFunc = () => {},
}) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      width="100%"
      justifyContent="space-around"
    >
      <ButtonSmall text={leftText} trigFunc={leftFunc} outlined />
      <ButtonSmall text={rightText} trigFunc={rightFunc} />
    </Box>
  );
}

export default ButtonSmallPair;
