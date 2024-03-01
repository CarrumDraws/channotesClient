import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import Button from "./Button";

function Navbar() {
  // page can be home, search, alerts, profile
  const { palette, transitions } = useTheme();
  const [page, setPage] = useState("home");
  const [count, setConut] = useState(0);
  const pages = ["home", "search", "alerts", "profile"];
  const image = useSelector((state) => state.image);
  const firstName = useSelector((state) => state.first_name);
  function toggle() {
    // Trigger active page
    setConut((count + 1) % 4);
    setPage(pages[count]);
  }

  return (
    <Box
      height="5rem"
      width="100%"
      position="fixed"
      bottom="0"
      right="0"
      onClick={() => {
        toggle();
      }}
    >
      <Box
        height="20%"
        width="100%"
        style={{
          background: `linear-gradient(0deg, ${palette.primary.main} 0%, ${
            palette.primary.main + "00"
          } 100%)`,
        }}
      />
      <Box
        position="absolute"
        height="80%"
        width="100%"
        backgroundColor={palette.primary.main}
      />
      <Box display="flex" position="absolute" height="80%" width="100%">
        <Button pageType="home" currPage={page} />
        <Button pageType="search" currPage={page} />
        <Button pageType="alerts" currPage={page} />
        <Button
          pageType="profile"
          currPage={page}
          image={image}
          name={firstName}
        />
      </Box>
    </Box>
  );
}

export default Navbar;
