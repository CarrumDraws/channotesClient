import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { io } from "socket.io-client";

import TopbarBuffer from "../../components/Topbar/TopbarBuffer";
import NavbarBuffer from "../../components/Navbar/NavbarBuffer";

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
  const url = useSelector((state) => state.url);

  let { note_id } = useParams();

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // Initialize SocketIO
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      console.log(s);
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

  // Get Existing Document from note_id
  useEffect(() => {
    if (!socket || !quill) return;
    socket.emit("get-document", note_id); // Pass note_id to socket...
    // ...retrieve document from socket
    socket.once("load-document", (delta) => {
      console.log(delta);
      quill.setContents(delta);
      quill.enable();
    });
  }, [socket, quill, note_id]);

  // Detect Text Changes on Doc -> Send to server
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return; // Make sure only changes by user detected
      socket.emit("send-changes", delta); // Send 'send-changes' event w/delta to server
    };
    quill.on("text-change", handler); // Add event listener
    return () => {
      quill.off("text-change", handler); // Remove event listener
    };
  }, [socket, quill]);

  // Detect Text Changes on Server -> Update on Doc
  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", handler); // Add event listener
    return () => {
      socket.off("recieve-changes", handler); // Remove event listener
    };
  }, [socket, quill]);

  // Auto-Save document every 2 seconds
  useEffect(() => {
    if (!socket || !quill) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <>
      <TopbarBuffer />
      <Box id="container" ref={wrapperRef} />
    </>
  );
}

export default Note;
