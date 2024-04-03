import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, useTheme, Fab, SvgIcon } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/TextInput/SearchBar";

import GroupNF from "../../components/NotesFriends/Group";
import GroupFM from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";
import Note from "../../components/NotesFriends/Note";

import { ReactComponent as AddNote } from "../../icons/AddNote.svg";
import { ReactComponent as AddFolder } from "../../icons/AddFolder.svg";

import { GetFolder, CreateFolder } from "../../api/folder/FolderCalls";
import { GetNotes, CreateNote } from "../../api/note/NoteCalls";

import FolderPopup from "../../components/Popups/FolderPopup";

function FolderPage() {
  const { palette, transitions } = useTheme();
  const navigate = useNavigate();

  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);

  let { folder_id } = useParams(); // If empty, home folder!

  const [folders, setFolders] = useState(null);
  const [notes, setNotes] = useState(null);
  const [select, setSelect] = useState(false); // "Selecting" state
  const [open, setOpen] = useState(false); // Popup State
  const [type, setType] = useState("new"); // Folder Popup Type

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (newType) => {
    console.log("Opened " + newType);
    setType(newType);
    setOpen(true);
  };

  async function createFolder(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = formJson.data;
    console.log("Title: " + data);
    try {
      const res = await CreateFolder({
        url: url,
        chan_token: chan_token,
        folder_id: folder_id,
        title: data,
      });
      navigate(`/folder/${res.id}`);
    } catch (error) {
      console.log(error.message);
      navigate("/error");
    }
    handleClose();
  }

  async function createNote() {
    console.log("Creating New Note");
    try {
      const res = await CreateNote({
        url: url,
        chan_token: chan_token,
        folder_id: folder_id,
      });
      console.log(res);
      navigate(`/note/${res.id}`);
    } catch (error) {
      console.log(error.message);
      navigate("/error");
    }
  }

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
        res.folders = res.folders.sort((a, b) => {
          if (a.special !== b.special) {
            return a.special ? -1 : 1;
          }
          return a.title.localeCompare(b.title);
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

  let buttonStyle = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -40%)",
    transition: "0.2s",
  };

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

        {/* FAB's */}
        <Fab
          size="medium"
          color="secondary"
          disableRipple
          sx={{
            boxShadow: "none",
            position: "absolute",
            bottom: 16,
            right: 100,
          }}
          onClick={() => handleOpen("new")}
        >
          <SvgIcon
            position="absolute"
            viewBox="0 0 25 30"
            sx={{ ...buttonStyle, height: "2rem", width: "4rem" }}
          >
            <AddFolder
              stroke={palette.secondary.text}
              style={{
                transition: "all .3s linear",
              }}
            />
          </SvgIcon>
        </Fab>
        <Fab
          size="medium"
          color="secondary"
          disableRipple
          sx={{
            boxShadow: "none",
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
          onClick={() => createNote()}
        >
          <SvgIcon
            position="absolute"
            viewBox="0 0 24 27"
            sx={{ ...buttonStyle, width: "1.5rem" }}
          >
            <AddNote
              stroke={palette.secondary.text}
              style={{
                transition: "all .3s linear",
              }}
            />
          </SvgIcon>
        </Fab>
        {/* Popups */}
        <FolderPopup
          type={type}
          isOpen={open}
          handleClose={handleClose}
          handleSubmit={createFolder}
        />
        {/* <FolderPopup
          type={type}
          isOpen={open}
          handleClose={handleClose}
          handleSubmit={createFolder}
        /> */}
      </Box>
      <NavbarBuffer />
    </Box>
  );
}

export default FolderPage;
