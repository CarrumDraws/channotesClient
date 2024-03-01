import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { setLogout } from "../../state";
import RefreshData from "../../widgets/RefreshData";
import { useNavigate } from "react-router-dom";
import Note from "../../components/NotesFriends/Note";
import GroupNF from "../../components/NotesFriends/Group";
import GroupFM from "../../components/FoldersMenus/Group";
import Friend from "../../components/NotesFriends/Friend";
import Folder from "../../components/FoldersMenus/Folder";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedNotes, setSelectedNotes] = React.useState(() => new Set()); // Stores ID's of selected notes
  const [select, setSelect] = useState(false); // The "Selecting" state for Notes and Folders
  const [page, setPage] = useState("home");

  // Adds/removes noteId from noteData
  function toggleSelected(noteId) {
    if (selectedNotes) {
      const newSet = new Set(selectedNotes);
      if (selectedNotes.has(noteId)) newSet.delete(noteId);
      else newSet.add(noteId);
      setSelectedNotes(newSet);
    }
  }

  function updateSelected() {
    console.log(selectedNotes);
    setSelectedNotes(() => new Set());
    setSelect(false);
  }

  let myNotes = [
    {
      id: "9db53587-da0a-4fec-826c-cdf66c9bb031",
      chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
      folder_id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
      title: "Note One",
      date_created: "2023-11-30T02:47:27",
      date_edited: "2023-11-30T02:48:45",
      pinned: false,
      locked: false,
      password: "",
      font_color: "#000000",
      background_color: "#ffffff",
    },
    {
      id: "6a518585-86d4-4009-a167-b684baa5810d",
      chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
      folder_id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
      title: "Note Two",
      date_created: "2023-11-30T02:45:34",
      date_edited: "2023-11-30T02:48:00",
      pinned: false,
      locked: false,
      password: "",
      font_color: "#000000",
      background_color: "#ffffff",
    },
    {
      id: "da5c9eb8-fb21-47bd-aea1-28eab6805bf7",
      chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
      folder_id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
      title: "Note Three",
      date_created: "2023-12-20T10:39:27",
      date_edited: "2023-12-20T10:39:46",
      pinned: false,
      locked: true,
      password: "",
      font_color: "#000000",
      background_color: "#ffffff",
    },
  ];
  let myFriends = [
    {
      chan_id: "1ef9a2fa-e9bd-4abe-8fd2-935666fc182d",
      first_name: "Mocha",
      last_name: "Dog",
      username: "Mokie",
      email: "mochadog@gmail.com",
      image:
        "https://jduihvayloafiorvjlfy.supabase.co/storage/v1/object/public/images/1705391981797Mocha.png",
    },
    {
      chan_id: "1ef9a2fa-e9bd-4abe-8fd2-935666fc182d",
      first_name: "Mocha",
      last_name: "Dog",
      username: "Mokie",
      email: "mochadog@gmail.com",
      image:
        "https://jduihvayloafiorvjlfy.supabase.co/storage/v1/object/public/images/1705391981797Mocha.png",
    },
    {
      chan_id: "1ef9a2fa-e9bd-4abe-8fd2-935666fc182d",
      first_name: "Mocha",
      last_name: "Dog",
      username: "Mokie",
      email: "mochadog@gmail.com",
      image:
        "https://jduihvayloafiorvjlfy.supabase.co/storage/v1/object/public/images/1705391981797Mocha.png",
    },
  ];
  let myFolders = [
    {
      id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
      chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
      folder_id: null,
      title: "Your Folders",
      date_created: "2023-09-09T18:52:39",
      notes: 3,
      folders: [
        {
          id: "b93301f4-5fe7-481b-9176-56dbaedb1f41",
          chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
          folder_id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
          title: "Folder A",
          date_created: "2024-01-17T07:49:57",
          notes: 0,
          folders: [
            {
              id: "570b156f-a332-46cf-86d9-fa8ba67c7a16",
              chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
              folder_id: "b93301f4-5fe7-481b-9176-56dbaedb1f41",
              title: "Folder B",
              date_created: "2024-01-17T07:50:27",
              notes: 0,
              folders: [],
            },
          ],
        },
        {
          id: "de9abdb9-433e-4844-90e0-9ed69f78022d",
          chan_id: "e71acbab-90c6-4303-bb01-f54436b2fe05",
          folder_id: "3635385c-30d6-42ef-b0fc-62853eeaaf27",
          title: "Folder C",
          date_created: "2024-01-17T08:38:54",
          notes: 0,
          folders: [],
        },
      ],
    },
  ];
  return (
    <Box>
      <button onClick={() => dispatch(setLogout())}>Sign Out</button>
      <button onClick={() => navigate("/editprofile")}>Edit Profile</button>
      <button onClick={() => setSelect(!select)}>
        Edit: {select ? "on" : "off"}
      </button>
      {select && <button onClick={() => updateSelected()}>Done</button>}
      <GroupNF>
        {myNotes.map((data, index) => {
          return (
            <Note
              data={data}
              select={select}
              toggleSelected={(id) => toggleSelected(id)}
              key={data.id}
            />
          );
        })}
      </GroupNF>
      <GroupNF>
        {myFriends.map((data, index) => {
          return <Friend data={data} key={index} />;
        })}
      </GroupNF>

      <GroupFM>
        {myFolders[0].folders.map((data) => {
          return <Folder data={data} select={select} key={data.id} />;
        })}
      </GroupFM>
      <Navbar page={page} />
    </Box>
  );
}

export default Home;
