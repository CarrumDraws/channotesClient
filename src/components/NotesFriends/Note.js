import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { EditNote } from "../../api/note/NoteCalls.js";

import Thumbnail from "../subcomponents/Thumbnail.js";
import cleanDate from "../helperFuncs/cleanDate.js";

import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Note({
  data,
  select,
  toggleSelected,
  shared = false,
  active = false,
}) {
  const navigate = useNavigate();
  const { palette, transitions } = useTheme();

  const chan_token = useSelector((state) => state.chan_token);
  const url = useSelector((state) => state.url);

  const firstRender = useRef(true);
  const [mouseDown, setMouseDown] = useState(false);
  const [dragStart, setDragStart] = useState(0); // Mouse X-Position when Start Dragging
  const [currDrag, setCurrDrag] = useState(0); // Mouse X-Position while Dragging
  const [xPos, setXPos] = useState(0); // Final X-Position. Ranges from 0 - -192 (48 * 4)
  const [prevXPos, setPrevXPos] = useState(-48); // X-Position of prev drag

  const [folder, setFolder] = useState(data.folder_id);
  const [pinned, setPinned] = useState(data.pinned);
  const [locked, setLocked] = useState(data.locked);
  const [password, setPassword] = useState(data.password);

  let { id, chan_id, title, subtext, date_created, date_edited } = data;

  // Edits note when dependancies change
  useEffect(() => {
    // Prevents first render
    if (firstRender.current) firstRender.current = false;
    else {
      async function CallEditNote() {
        try {
          await EditNote({
            url: url,
            chan_token: chan_token,
            note_id: id,
            folder_id: folder,
            pinned: pinned,
            locked: locked,
            password: password,
          });
        } catch (error) {
          console.log(error.message);
          navigate("/error");
        }
      }
      CallEditNote();
    }
  }, [url, chan_token, id, folder, pinned, locked, password, navigate]);

  // Calculates drag distance based off dragStart and currDrag
  useEffect(() => {
    let pos = prevXPos - (dragStart - currDrag); // Subtract by previous drag value
    if (0 < pos) pos = 0; // Minimum
    else if (pos < -192) pos = -192; // Maximum
    setXPos(pos);
  }, [dragStart, currDrag, prevXPos]);

  // Position Snapping w/ GSAP
  function dragEnd(x) {
    const myPosObj = { x: xPos };
    if (xPos > -24)
      gsap.to(myPosObj, {
        x: 0,
        duration: 0.75,
        ease: "power3.out",
        onUpdate: () => {
          setXPos(myPosObj.x);
          setPrevXPos(myPosObj.x);
        },
      });
    else if (xPos < -80)
      gsap.to(myPosObj, {
        x: -192,
        duration: 0.75,
        ease: "power3.out",
        onUpdate: () => {
          setXPos(myPosObj.x);
          setPrevXPos(myPosObj.x);
        },
      });
    else {
      if (dragStart === currDrag) navigate(`/note/${id}`);
      gsap.to(myPosObj, {
        x: -48,
        duration: 0.75,
        ease: "elastic.out(1,0.5)",
        onUpdate: () => {
          setXPos(myPosObj.x);
          setPrevXPos(myPosObj.x);
        },
      });
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        userSelect: "none",
        flexDirection: "row",
        height: "3rem",
        width: "calc(100% + 12rem)",
        left: `calc(${xPos}px)`,
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
          onClick={() => setPinned(!pinned)}
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
            {!title ? "New Note" : title}
          </Typography>
          <Typography variant="exSmall" noWrap>
            {cleanDate(date_edited)} {subtext ? subtext : ""}
          </Typography>
        </Box>
        <Box
          sx={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
          <Thumbnail
            sx={{
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
            type="m"
          />
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
