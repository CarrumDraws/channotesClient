import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/SearchBar.js/SearchBar";

import Group from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";
function Home() {
  const { palette, transitions } = useTheme();

  let shared = {
    id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
    chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
    folder_id: null,
    title: "Shared",
    date_created: "2023-09-09T18:52:39",
    notes: 3,
    folders: [],
  };

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
          Folder Name
        </Typography>
        <Box height="0.5rem" width="100%" />
        <SearchBar />
        <Box height="1rem" width="100%" />
        <Group>
          <Folder data={shared} />
        </Group>
        <Box height="1.25rem" width="100%" />
        <Box>
          <Typography
            variant="medBold"
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: palette.primary.text,
            }}
          >
            Folders
          </Typography>
          <Box height="0.25rem" width="100%" />
          <Group>
            <Folder data={shared} />
          </Group>
        </Box>
      </Box>
      <NavbarBuffer />
    </Box>
  );
}

export default Home;
