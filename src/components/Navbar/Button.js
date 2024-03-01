import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ProfPic from "../subcomponents/ProfPic";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function Button({ pageType, currPage, image, name }) {
  const { palette, transitions } = useTheme();
  function checkPage() {
    // page can be home, search, alerts, profile
    // Checks if URL matches the pageType
    return pageType === currPage;
  }
  let buttonStyle = {
    position: "absolute",
    height: "2.5rem",
    width: "auto",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    transition: "0.2s",
    color: checkPage() ? palette.primary.text : palette.primary.main,
  };
  return (
    <>
      <Box
        height="100%"
        flexGrow="1"
        sx={{
          backgroundColor: palette.primary.text,
          transition: "0.2s ease-out",
          borderRadius: checkPage() ? "0% 50% 0% 0% " : "0% 0% 0% 0%",
        }}
      />
      <Box position="relative" height="100%" width="4rem">
        {pageType === "home" && (
          <HomeOutlinedIcon
            position="absolute"
            sx={buttonStyle}
            style={{
              top: "45%",
              height: "2.75rem",
            }}
          />
        )}
        {pageType === "search" && (
          <NotificationsNoneIcon position="absolute" sx={buttonStyle} />
        )}
        {pageType === "alerts" && (
          <SearchIcon position="absolute" sx={buttonStyle} />
        )}
        {pageType === "profile" && (
          <Box sx={buttonStyle}>
            <ProfPic
              position="absolute"
              url={image}
              initials={name[0]}
              type="m"
            />
          </Box>
        )}

        <svg position="relative" height="100%" width="4rem">
          <mask id={pageType + "abcd"}>
            {/* White = Visible, Black = Invisible */}
            <rect width="100%" height="100%" fill="white" />
            <rect
              width="100%"
              height="50%"
              style={{ transition: "all .3s ease-out" }}
              y={checkPage() ? "0%" : "-100%"}
              fill="black"
            />
            <circle
              r="50%"
              cx="50%"
              style={{ transition: "all .3s ease-out" }}
              cy={checkPage() ? "50%" : "-50%"}
              fill="black"
            />
          </mask>
          <rect
            fill={palette.primary.text}
            width="100%"
            height="100%"
            mask={`url(#${pageType + "abcd"})`}
          />
        </svg>
      </Box>

      <Box
        height="100%"
        flexGrow="1"
        sx={{
          backgroundColor: palette.primary.text,
          transition: "0.2s ease-out",
          borderRadius: checkPage() ? "50% 0% 0% 0% " : "0% 0% 0% 0%",
        }}
      />
    </>
  );
}

export default Button;
