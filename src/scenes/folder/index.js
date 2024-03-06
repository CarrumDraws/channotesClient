import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/SearchBar.js/SearchBar";

import Group from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";

import { GetFolder } from "../../api/folders/FolderCalls";

function FolderPage() {
  let [folders, setFolders] = useState({
    title: null,
    chan_id: null,
    date_created: null,
    folder_id: null,
    folders: [],
    id: null,
    notes: 0,
  });
  const [select, setSelect] = useState(false); // "Selecting" state
  const { palette, transitions } = useTheme();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  let { folder_id } = useParams();

  // Get Folder
  useEffect(() => {
    async function getFolderData() {
      try {
        const res = await GetFolder({
          url: url,
          chan_token: chan_token,
          folder_id: folder_id,
        });
        setFolders(res);
      } catch (error) {
        console.log(error.message);
      }
    }
    getFolderData();
  }, [url, chan_token, folder_id]);

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
          {folders.title}
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
              marginLeft: "0.5rem",
            }}
          >
            Folders
          </Typography>
          <Box height="0.25rem" width="100%" />
          <Group>
            {folders.folders.map((data) => {
              return <Folder data={data} select={select} key={data.id} />;
            })}
          </Group>
        </Box>
      </Box>
      <NavbarBuffer />
    </Box>
  );
}

export default FolderPage;
