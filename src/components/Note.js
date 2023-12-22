import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import Thumbnail from "./Thumbnail.js";
import cleanDate from "./helperFuncs/cleanDate.js";

function Note({ data, select, toggleSelected }) {
  const { palette, transitions } = useTheme();
  const noteRef = useRef(null);
  const [dragStart, setDragStart] = useState(null);
  const [pos, setPos] = useState(1); // Position of Note: 0 = Pinned, 1 = default, 2 = Right Menu,
  let {
    id,
    chan_id,
    folder_id,
    title,
    subtitle,
    date_created,
    date_edited,
    pinned,
    locked,
  } = data;

  function dragEnd(x, y) {
    if (!dragStart) return;
    let diff = x - dragStart.x;
    if (diff > 50) setPos(pos === 0 ? 0 : pos - 1);
    else if (diff < 50) setPos(pos === 2 ? 2 : pos + 1);
    setDragStart(null);
  }

  return (
    <Box
      ref={noteRef}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        height: "3rem",
        width: "calc(100% + 12rem)",
        left: pos === 0 ? "0rem" : pos === 2 ? "-12rem" : "-3rem",
        // left: "50px",
        transition: "all 0.5s",
      }}
      onMouseDown={(event) => {
        setDragStart({ x: event.clientX, y: event.clientY });
      }}
      onMouseUp={(event) => {
        dragEnd(event.clientX, event.clientY);
      }}
      onTouchStart={(event) => {
        setDragStart({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
        // console.log(event.touches[0].clientX);
      }}
      onTouchEnd={(event) => {
        dragEnd(
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY
        );
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
          width: "3rem",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            backgroundColor: palette.action.pin,
          }}
        >
          {pinned ? (
            <PushPinIcon
              sx={{
                position: "absolute",
                width: "1.5rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -40%) rotate(45deg)",
                color: palette.secondary.text,
              }}
            />
          ) : (
            <PushPinOutlinedIcon
              sx={{
                position: "absolute",
                width: "1.5rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -40%) rotate(45deg)",
                color: palette.secondary.text,
              }}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          width: "calc(100% - 12rem)",
          backgroundColor: palette.tertiary.main,
        }}
      >
        {select && (
          <Checkbox
            color="secondary"
            size="medium"
            icon={<RadioButtonUncheckedOutlinedIcon />}
            checkedIcon={<RadioButtonCheckedOutlinedIcon />}
            onChange={() => {
              toggleSelected(id);
            }}
            disableRipple={true}
          />
        )}
        <LockOutlinedIcon
          sx={{
            color: palette.tertiary.text,
            width: "0.75rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            opacity: locked ? "1" : "0",
          }}
        />
        <Box
          sx={{
            flexGrow: "99",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography variant="med" noWrap>
            {title}
          </Typography>
          <Typography variant="exSmall" noWrap>
            {cleanDate(date_edited)}{" "}
            {subtitle
              ? subtitle
              : "Preview Text Hereeeeeeeeeeeeeeeeeeeeeeeeeee"}
          </Typography>
        </Box>
        <Box
          sx={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
          <Thumbnail type="m" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          width: "9rem",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "33%",
            backgroundColor: palette.action.share,
          }}
        >
          <IosShareIcon
            sx={{
              position: "absolute",
              width: "1.5rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              color: palette.secondary.text,
            }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "33%",
            backgroundColor: palette.action.move,
          }}
        >
          <FolderOutlinedIcon
            sx={{
              position: "absolute",
              width: "1.5rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: palette.secondary.text,
            }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "34%",
            backgroundColor: palette.action.delete,
          }}
        >
          <DeleteOutlinedIcon
            sx={{
              position: "absolute",
              width: "1.5rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: palette.secondary.text,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Note;
