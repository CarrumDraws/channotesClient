import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { createBrowserHistory } from "history";

import { Box, Typography, useTheme } from "@mui/material";
import { ReactComponent as Settings } from "../../icons/Settings.svg";
function Topbar() {
  // page can be home, search, alerts, profile
  const { palette, transitions } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const chanId = useSelector((state) => state.chan_id);

  // Check if current page is a root page
  function isRoot() {
    console.log(location.pathname);
    if (
      location.pathname === "/" ||
      location.pathname === "/search" ||
      location.pathname === `/user/${chanId}`
    )
      return true;
    return false;
  }

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Box
      height="5rem"
      width="100%"
      position="fixed"
      top="0"
      right="0"
      style={{
        background: palette.tertiary.main,
        borderRadius: "0px 0px 25px 25px",
      }}
    >
      <Box
        sx={{
          paddingTop: "2.5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexBasis: "100%" }}>
          <Box sx={{ padding: "0rem 1rem 0rem 1rem" }}>
            {!isRoot() && (
              <Typography
                variant="small"
                noWrap
                color={palette.tertiary.text}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: palette.tertiary.text,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(-1); // What does this do when it doesnt go anywhere?
                }}
              >
                &lt; Back
              </Typography>
            )}
          </Box>
        </Box>
        <Box>
          <Typography
            variant="small"
            noWrap
            color={palette.tertiary.text}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: palette.tertiary.text,
            }}
          >
            ChanNotes
          </Typography>
        </Box>
        <Box
          sx={{
            flexBasis: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ padding: "0rem 1rem 0rem 1rem" }}>
            <Settings stroke={palette.tertiary.text} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
