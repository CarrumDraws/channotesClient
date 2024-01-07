import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import Thumbnail from "./Thumbnail.js";
import cleanDate from "./helperFuncs/cleanDate.js";

function Note({
  data,
  select,
  toggleSelected,
  shared = false,
  active = false,
}) {
  const { palette, transitions } = useTheme();
  const noteRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [dragStart, setDragStart] = useState(0); // Mouse X-Position when Start Dragging
  const [currDrag, setCurrDrag] = useState(0); // Mouse X-Position while Dragging
  const [xPos, setXPos] = useState(0); // Final X-Position. Ranges from 0 - -192 (48 * 4)
  const [prevXPos, setPrevXPos] = useState(-48); // X-Position of prev drag
  // const [pos, setPos] = useState(1); // Position of Note: 0 = Pinned, 1 = default, 2 = Right Menu,
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

  // Calculates drag distance based off dragStart and currDrag
  useEffect(() => {
    let pos = prevXPos - (dragStart - currDrag); // Subtract by previous drag value
    if (0 < pos) pos = 0; // Minimum
    else if (pos < -192) pos = -192; // Maximum
    setXPos(pos);
  }, [dragStart, currDrag, prevXPos]);

  // Now: Add Snapping!!
  function dragEnd(x) {}

  return (
    <Box
      ref={noteRef}
      sx={{
        position: "relative",
        display: "flex",
        userSelect: "none",
        flexDirection: "row",
        height: "3rem",
        width: "calc(100% + 12rem)",
        left: `calc(${xPos}px)`,
        // transition: "all 0.5s",
      }}
      onMouseDown={(event) => {
        setMouseDown(true);
        setDragStart(event.clientX);
        setCurrDrag(event.clientX);
      }}
      onMouseMove={(event) => {
        if (mouseDown) setCurrDrag(event.clientX);
      }}
      onMouseUp={(event) => {
        setMouseDown(false);
        dragEnd(event.clientX);
        // Reset Drag Positions
        setPrevXPos(xPos);
        setDragStart(0);
        setCurrDrag(0);
      }}
      onTouchStart={(event) => {
        setMouseDown(true);
        setDragStart(event.touches[0].clientX);
        setCurrDrag(event.touches[0].clientX);
      }}
      onTouchMove={(event) => {
        if (mouseDown) setCurrDrag(event.touches[0].clientX);
      }}
      onTouchEnd={(event) => {
        setMouseDown(false);
        dragEnd(event.changedTouches[0].clientX);
        // Reset Drag Positions
        setPrevXPos(xPos);
        setDragStart(0);
        setCurrDrag(0);
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
          backgroundColor: active
            ? palette.tertiary.alt
            : palette.tertiary.main,
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
        {shared ? (
          <PersonIcon
            sx={{
              color: palette.action.share,
              width: "0.75rem",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          />
        ) : (
          <LockOutlinedIcon
            sx={{
              color: palette.action.text,
              width: "0.75rem",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              opacity: locked ? "1" : "0",
            }}
          />
        )}
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
