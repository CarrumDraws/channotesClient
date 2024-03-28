import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { io } from "socket.io-client";

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
  const [title, setTitle] = useState("New Note");
  const [date, setDate] = useState(null);
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

  // Get Existing Title and Delta from note_id
  useEffect(() => {
    if (!socket || !quill) return;
    socket.emit("get-document", chan_token, note_id); // Pass note_id to socket...
    // ...retrieve document from socket
    socket.once("load-document", (data) => {
      quill.setContents(data.delta);
      quill.enable();
      setTitle(data.title);
      setDate(data.date_created);
    });
  }, [socket, quill, chan_token, note_id]);

  // Detect Delta Changes on Doc -> Send to Server
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return; // Make sure only changes by user detected
      socket.emit("send-text-changes", delta); // Send 'send-text-changes' event w/delta to server
    };
    quill.on("text-change", handler); // Add event listener
    return () => {
      quill.off("text-change", handler); // Remove event listener
    };
  }, [socket, quill]);

  // Detect Title Changes -> Send to Server > Calls save-title
  useEffect(() => {
    if (!socket) return;
    console.log("Updating Title");
    socket.emit("send-title-changes", chan_id, title);
    setTitle(title);
  }, [socket, chan_id, title]);

  // Detect Delta and Title Changes on Server -> Update on Doc
  useEffect(() => {
    if (!socket || !quill) return;
    const textHandler = (delta) => {
      quill.updateContents(delta);
    };
    const titleHandler = (title) => {
      setTitle(title);
    };
    socket.on("recieve-text-changes", textHandler); // Add event listener
    socket.on("recieve-title-changes", titleHandler);
    return () => {
      socket.off("recieve-text-changes", textHandler); // Remove event listener
      socket.off("recieve-title-changes", titleHandler);
    };
  }, [socket, quill]);

  // Detect Errors
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (error) => {
      console.log(error);
    };
    socket.on("error", handler); // Add event listener
    return () => {
      socket.off("error", handler); // Remove event listener
    };
  }, [socket, quill]);

  // Auto-Save Delta and Text every 15 seconds + Save when nav-ing away
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
      <TopbarBuffer />
      <TitleBar title={title} date={date} />
      <Box id="container" ref={wrapperRef} />
    </>
  );
}

export default Note;
