import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import SearchBar from "../../components/SearchBar.js/SearchBar";

import Group from "../../components/FoldersMenus/Group";
import Folder from "../../components/FoldersMenus/Folder";

function FolderPage() {
  const { palette, transitions } = useTheme();
  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);
  const [getQuery, setQuery] = useSearchParams();
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
          Search
        </Typography>
        <Box height="0.5rem" width="100%" />
        <SearchBar />
        <Box height="1rem" width="100%" />
        <button onClick={() => setQuery({ query: "New Query" })}>
          Set Query
        </button>
        <button
          onClick={() =>
            setQuery((params) => {
              params.delete("query");
              return params;
            })
          }
        >
          Delete Query
        </button>
        Search {getQuery.get("query")}
      </Box>
      <NavbarBuffer />
    </Box>
  );
}

export default FolderPage;
