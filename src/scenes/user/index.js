import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/SearchBar.js/SearchBar";
import ProfPic from "../../components/subcomponents/ProfPic";
import Selector from "../../components/Selector/Selector";
import EditProfile from "../../components/Buttons/EditProfile";

import GroupNF from "../../components/NotesFriends/Group";
import GroupFM from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";
import Note from "../../components/NotesFriends/Note";

import { GetUser } from "../../api/users/UserCalls";
import { GetFolder } from "../../api/folders/FolderCalls";
import { GetNotes } from "../../api/notes/NoteCalls";

function FolderPage() {
  const { palette, transitions } = useTheme();
  const navigate = useNavigate();

  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);

  const [user, setUser] = useState(null);

  let { chan_id } = useParams(); // If empty, error

  // Get Data
  useEffect(() => {
    async function getUserData() {
      try {
        const res = await GetUser({
          url: url,
          chan_token: chan_token,
          chan_id: chan_id,
        });
        console.log(res);
        setUser(res);
      } catch (error) {
        console.log(error.message);
        navigate("/error");
      }
    }
    getUserData();
  }, [url, chan_token, chan_id]);

  return (
    <Box>
      <TopbarBuffer />

      <Box
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="space-between"
        alignItems="flex-starts"
        gap="0.5rem"
        sx={{ m: "1.5rem" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <ProfPic
            url={user?.image && user.image}
            initials={user?.username && user.username[0]}
            type="l"
          />
          <EditProfile />
        </Box>
        <Typography
          variant="large"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: palette.primary.text,
          }}
        >
          {user?.username && user.username}
        </Typography>
        {user?.first_name && (
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: palette.quarternary.textSub,
                display: "inline-block",
              }}
            >
              {user.first_name + " " + user.last_name}
            </Typography>
            <Typography
              variant="body2"
              display="inline"
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: palette.quarternary.text,
                display: "inline-block",
              }}
            >
              {"\u00A0"} &#x2022; {"\u00A0"}
              {user.friends + " Friend"}
              {user.friends === 1 ? "" : "s"}
            </Typography>
          </Box>
        )}
        <Selector />
      </Box>

      <NavbarBuffer />
    </Box>
  );
}

export default FolderPage;
