import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import Button from "./Button";

function Navbar() {
  // page can be home, search, alerts, profile
  const { palette, transitions } = useTheme();
  const location = useLocation();
  const [page, setPage] = useState("home");

  const image = useSelector((state) => state.image);
  const firstName = useSelector((state) => state.first_name);
  const chanId = useSelector((state) => state.chan_id);

  useEffect(() => {
    // Sets Page
    switch (location.pathname.split("/")[1]) {
      case "user":
        setPage("profile");
        break;
      case "search":
        setPage("search");
        break;
      case "alerts":
        setPage("alerts");
        break;
      default:
        setPage("home");
    }
  }, []);

  return (
    <Box height="5rem" width="100%" position="fixed" bottom="0" right="0">
      <Box
        height="20%"
        width="100%"
        style={{
          background: `linear-gradient(0deg, ${palette.primary.main} 0%, ${
            palette.primary.main + "00"
          } 100%)`,
        }}
      />
      {/* Background color */}
      <Box
        position="absolute"
        height="80%"
        width="100%"
        backgroundColor={palette.primary.text}
      />
      <Box display="flex" position="absolute" height="80%" width="100%">
        <Button pageType="home" currPage={page} setPage={setPage} />
        <Button pageType="search" currPage={page} setPage={setPage} />
        <Button pageType="alerts" currPage={page} setPage={setPage} disabled />
        <Button
          pageType="profile"
          currPage={page}
          setPage={setPage}
          userData={{ image: image, name: firstName, chanid: chanId }}
        />
      </Box>
    </Box>
  );
}

export default Navbar;
