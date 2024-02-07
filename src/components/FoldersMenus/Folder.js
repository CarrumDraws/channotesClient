import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Folder({ data, level = 0, select, disabled = false }) {
  const { palette, transitions } = useTheme();

  let { id, chan_id, folder_id, title, date_created, notes, folders } = data;

  let [isOpen, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          userSelect: "none",
          height: "2rem",
          width: "100%",
          backgroundColor: palette.tertiary.main,
        }}
      >
        <FolderOutlinedIcon
          sx={{
            paddingLeft: `calc(1rem + min(${level}rem * 2, 10rem))`,
            paddingRight: "1rem",
            fontSize: "28px",
            color: disabled ? palette.tertiary.disabled : palette.tertiary.text,
          }}
        />

        <Box
          sx={{
            paddingRight: "0.5rem",
          }}
        />
        <Typography
          variant="med"
          noWrap
          sx={{
            marginTop: "0.18rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: disabled ? palette.tertiary.disabled : palette.tertiary.text,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            flexGrow: "99",
          }}
        />
        {select ? (
          <Button
            disableRipple={true}
            sx={{
              minWidth: "0",
            }}
          >
            <EditOutlinedIcon
              sx={{
                margin: "0",
                padding: "0",
                color: palette.tertiary.text,
              }}
            />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setOpen(!isOpen);
            }}
            disableRipple={true}
            disabled={folders.length === 0 || disabled}
            sx={{
              marginLeft: "1rem",
            }}
          >
            <Typography
              variant="med"
              sx={{
                marginTop: "0.18rem",
                marginRight: "0.5rem",
                color:
                  folders.length === 0
                    ? palette.tertiary.disabled
                    : palette.tertiary.text,
              }}
            >
              {folders.length}
            </Typography>
            <KeyboardArrowRightIcon
              sx={{
                color:
                  folders.length === 0
                    ? palette.tertiary.disabled
                    : palette.tertiary.text,
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition: "all 0.35s cubic-bezier(0.68, -0.6, 0.32, 1.6) 0s;",
              }}
            />
          </Button>
        )}
      </Box>
      {isOpen &&
        folders.map((data) => {
          return (
            <Folder
              data={data}
              level={level + 1}
              select={select}
              key={data.id}
            />
          );
        })}
    </>
  );
}

export default Folder;
