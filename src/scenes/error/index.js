import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/TextInput/SearchBar";

import Group from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";

function ErrorPage() {
  const { palette, transitions } = useTheme();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);

  return (
    <Box>
      <TopbarBuffer />

      <Box
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="space-between"
        alignItems="flex-starts"
        sx={{ m: "1.5rem" }}
      >
        <Typography
          variant="large"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: palette.primary.text,
          }}
        >
          Error
        </Typography>
      </Box>
      <NavbarBuffer />
    </Box>
  );
}

export default ErrorPage;
