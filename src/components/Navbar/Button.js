import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Typography, useTheme, SvgIcon } from "@mui/material";

import ProfPic from "../subcomponents/ProfPic";

import { ReactComponent as HomeIcon } from "../../icons/Home.svg";
import { ReactComponent as AlertsIcon } from "../../icons/Alerts.svg";
import { ReactComponent as SearchIcon } from "../../icons/Search.svg";

function Button({ pageType, currPage, setPage, userData = {}, disabled }) {
  const mode = useSelector((state) => state.mode);
  const { palette, transitions } = useTheme();
  const navigate = useNavigate();
  const { image, name, chanid } = userData;
  function checkPage() {
    // page can be home, search, alerts, profile
    // Checks if URL matches the pageType
    return pageType === currPage;
  }
  let buttonStyle = {
    position: "absolute",
    height: "2rem",
    width: "auto",
    top: checkPage() ? "35%" : "45%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    transition: "0.2s",
  };
  let bkrdColor =
    mode === "light" ? palette.primary.main : palette.quarternary.main;
  let color = disabled
    ? palette.secondary.alt
    : checkPage()
    ? palette.primary.text
    : bkrdColor;

  return (
    <>
      <Box position="relative" height="100%" flexGrow="1">
        {/* Yellow Bkrd to prevent hairline cracks*/}
        <Box
          position="absolute"
          width="calc(180% + 4rem)"
          top="0%"
          left="10%"
          sx={{
            backgroundColor: bkrdColor,
            transition: checkPage() ? "0.1s linear " : "0.1s linear ",
            height: checkPage() ? "50%" : "0%",
          }}
        />
        <Box
          position="relative"
          height="100%"
          width="100%"
          sx={{
            backgroundColor: palette.primary.text,
            transition: checkPage() ? "0.1s ease-out 0.1s" : "0.1s ease-out 0s",
            borderRadius: checkPage() ? "0% 2rem 0% 0% " : "0% 0rem 0% 0%",
          }}
        />
      </Box>

      <Box
        position="relative"
        height="100%"
        width="4rem"
        onClick={() => {
          if (disabled) return;
          setPage(pageType);
          switch (pageType) {
            case "search":
              navigate("/search");
              break;
            case "profile":
              navigate(`/user/${chanid}`);
              break;
            case "alerts":
              navigate("/alerts");
              break;
            default:
              navigate("/");
          }
        }}
      >
        {pageType === "home" && (
          <SvgIcon position="absolute" sx={buttonStyle}>
            <HomeIcon
              fill={color}
              stroke={color}
              strokeWidth={checkPage() ? "3" : "2"}
              style={{
                transition: "all .3s linear",
              }}
            />
          </SvgIcon>
        )}
        {pageType === "search" && (
          <SvgIcon position="absolute" sx={buttonStyle}>
            <SearchIcon
              fill={color}
              stroke={color}
              strokeWidth={checkPage() ? "3" : "2"}
              style={{
                transition: "all .3s linear",
              }}
            />
          </SvgIcon>
        )}
        {pageType === "alerts" && (
          <SvgIcon position="absolute" sx={buttonStyle}>
            <AlertsIcon
              fill={color}
              stroke={color}
              strokeWidth={checkPage() ? "3" : "2"}
              style={{
                transition: "all .3s linear",
              }}
            />
          </SvgIcon>
        )}
        {pageType === "profile" && (
          <Box sx={buttonStyle}>
            <Box
              position="absolute"
              sx={buttonStyle}
              style={{
                width: checkPage() ? `2.75rem` : `2.5rem`,
                height: checkPage() ? `2.75rem` : `2.5rem`,
                top: checkPage() ? "40%" : "45%",
                borderRadius: `50%`,
                backgroundColor: color,
              }}
            />
            <ProfPic
              position="absolute"
              url={image}
              initials={name[0]}
              type="m"
            />
          </Box>
        )}
        <svg position="relative" height="100%" width="4rem">
          <circle
            r="50%"
            cx="50%"
            style={{
              transition: "all .2s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
            }}
            cy={checkPage() ? "50%" : "-50%"}
            fill={bkrdColor}
          />
          <rect
            width="100%"
            height="100%"
            style={{
              transition: "all .2s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
            }}
            y={checkPage() ? "-50%" : "-150%"}
            fill={bkrdColor}
          />
        </svg>
      </Box>

      <Box
        position="relative"
        height="100%"
        flexGrow="1"
        sx={{
          backgroundColor: palette.primary.text,
          transition: checkPage() ? "0.1s ease-out 0.1s" : "0.1s ease-out 0s",
          borderRadius: checkPage() ? "2rem 0% 0% 0% " : "0rem 0% 0% 0%",
        }}
      />
    </>
  );
}

export default Button;
