import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/SearchBar.js/SearchBar";

import GroupNF from "../../components/NotesFriends/Group";
import GroupFM from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";
import Note from "../../components/NotesFriends/Note";

import { GetFolder } from "../../api/folder/FolderCalls";
import { GetNotes } from "../../api/note/NoteCalls";

function FolderPage() {
  const { palette, transitions } = useTheme();
  const navigate = useNavigate();

  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);

  const [folders, setFolders] = useState(null);
  const [notes, setNotes] = useState(null);
  const [select, setSelect] = useState(false); // "Selecting" state

  let { folder_id } = useParams(); // If empty, home folder!

  // Get Data
  useEffect(() => {
    // Get Folder
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
        navigate("/error");
      }
    }
    getFolderData();
    // Get Notes
    async function GetNoteData() {
      try {
        const res = await GetNotes({
          url: url,
          chan_token: chan_token,
          folder_id: folder_id,
        });
        setNotes(res);
      } catch (error) {
        console.log(error.message);
        navigate("/error");
      }
    }
    GetNoteData();
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
          {folders?.title}
        </Typography>
        <Box height="0.5rem" width="100%" />
        <SearchBar />

        {/* Shared Section */}
        {!folder_id && (
          <>
            <Box height="1rem" width="100%" />
            <GroupFM>
              <Folder data={shared} />
            </GroupFM>
          </>
        )}

        {/* Folders Section */}
        {folders?.folders?.length > 0 && (
          <Box sx={{ marginTop: "1.25rem" }}>
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
            <GroupFM>
              {folders?.folders.map((data) => {
                return <Folder data={data} select={select} key={data.id} />;
              })}
            </GroupFM>
          </Box>
        )}

        {/* Notes Section */}
        {notes?.length > 0 && (
          <Box sx={{ marginTop: "1.25rem" }}>
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
              Notes
            </Typography>
            <Box height="0.25rem" width="100%" />
            <GroupNF>
              {notes.map((data, index) => {
                return (
                  <Note
                    data={data}
                    select={select}
                    toggleSelected={(id) => setSelect(id)}
                    key={data.id}
                  />
                );
              })}
            </GroupNF>
          </Box>
        )}
      </Box>
      <NavbarBuffer />
    </Box>
  );
}

export default FolderPage;
