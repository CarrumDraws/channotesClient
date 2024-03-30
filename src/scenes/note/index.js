import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { io } from "socket.io-client";

import EditNoteTitle from "../../components/Popups/EditNoteTitle";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";
import TitleBar from "../../components/subcomponents/TitleBar";

import Quill from "quill";
import "quill/dist/quill.snow.css"; // stylesheet included in library
import "./index.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["link", "image"],

  [{ header: 1 }, { header: 2 }, { header: false }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "+1" }], // indent

  [{ size: ["small", false, "large", "huge"] }], // dropdowns
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
];

function Note() {
  const { palette, transitions } = useTheme();
  const chan_token = useSelector((state) => state.chan_token);
  const chan_id = useSelector((state) => state.chan_id);
  const url = useSelector((state) => state.url);

  let { note_id } = useParams();

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  const [open, setOpen] = useState(false); // Popup State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = formJson.data;
    setTitle(data);
    handleClose();
  }

  // Initialize SocketIO
  useEffect(() => {
    const s = io(url);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // Initialize Quill
  const wrapperRef = useCallback((wrapper) => {
    // useCallback instead of useEffect ensures wrapperRef is defined
    if (wrapper == null) return;
    wrapper.innerHTML = ""; // remove children
    const editor = document.createElement("div"); // new div
    wrapper.append(editor); // place div IN ref
    const q = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  // Get Title and Delta
  // Detect Delta Changes -> Send to Server
  // Receive Delta and Title Changes -> Update on Doc
  useEffect(() => {
    if (!socket || !quill) return;
    const changeHandler = (delta, oldDelta, source) => {
      if (source !== "user") return; // Only changes by user detected
      socket.emit("send-text-changes", delta);
    };
    const textHandler = (delta) => {
      quill.updateContents(delta);
    };
    const titleHandler = (title) => {
      setTitle(title);
    };

    // Get Title and Delta
    socket.emit("get-document", chan_token, note_id); // Request...
    // ...Recieve
    socket.once("load-document", (data) => {
      quill.setContents(data.delta);
      quill.enable();
      setTitle(data.title);
      setDate(data.date_created);
    });

    // Detect Delta Changes -> Send to Server
    quill.on("text-change", changeHandler);

    // Receive Delta and Title Changes -> Update on Doc
    socket.on("recieve-text-changes", textHandler);
    socket.on("recieve-title-changes", titleHandler);

    return () => {
      quill.off("text-change", changeHandler); // Remove event listener
      socket.off("recieve-text-changes", textHandler);
      socket.off("recieve-title-changes", titleHandler);
    };
  }, [socket, quill, chan_token, note_id]);

  // Send Title Changes
  // Detect Errors
  useEffect(() => {
    if (!socket) return;
    const errorHandler = (error) => {
      console.log(error);
    };
    socket.on("error", errorHandler);
    socket.emit("send-title-changes", chan_id, title);
    setTitle(title);
    return () => {
      socket.off("error", errorHandler); // Remove event listener
    };
  }, [socket, chan_id, title]);

  // Auto-Save Delta and Text at intervals + Save when nav-ing away
  useEffect(() => {
    if (!socket || !quill || !document.getElementById("container")) return;
    const interval = setInterval(() => saveData(), 15000);
    const handleVis = () => {
      if (document.visibilityState === "hidden") saveData();
    };
    window.addEventListener("visibilitychange", handleVis);

    const saveData = () => {
      console.log("Saved");
      socket.emit("save-text", chan_id, quill.getText(), quill.getContents());
    };
    return () => {
      // Remove the event listener when the component unmounts
      clearInterval(interval);
      window.removeEventListener("visibilitychange", handleVis);
    };
  }, [socket, quill, chan_id]);

  return (
    <>
      <EditNoteTitle
        isOpen={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <TopbarBuffer />
      <TitleBar onClick={handleOpen} title={title} date={date} />
      <Box id="container" ref={wrapperRef} />
    </>
  );
}

export default Note;
