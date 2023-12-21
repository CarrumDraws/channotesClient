import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import RefreshData from "../../widgets/RefreshData";
import { useNavigate } from "react-router-dom";
import Note from "../../components/Note";
import Notes from "../../components/Notes";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [noteData, setNoteData] = useState([]);
  const [selected, setSelected] = React.useState(() => new Set()); // Stores ID's of selected notes
  const [select, setSelect] = useState(false); // The "Selecting" state

  // Adds/removes noteId from noteData
  function toggleSelected(noteId) {
    if (selected) {
      const newSet = new Set(selected);
      if (selected.has(noteId)) newSet.delete(noteId);
      else newSet.add(noteId);
      setSelected(newSet);
    }
  }

  function updateSelected() {
    console.log(selected);
    setSelected(() => new Set());
    setSelect(false);
  }

  useEffect(() => {
    setNoteData(dummyData);
  }, []);
  let dummyData = [
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

  return (
    <div>
      <button onClick={() => dispatch(setLogout())}>Sign Out</button>
      <button onClick={() => navigate("/editprofile")}>Edit Profile</button>
      <button onClick={() => setSelect(!select)}>
        Select: {select ? "on" : "off"}
      </button>
      {select && <button onClick={() => updateSelected()}>Done</button>}

      <Notes>
        {noteData.map((data, index) => {
          return (
            <Note
              data={data}
              select={select}
              toggleSelected={(id) => toggleSelected(id)}
              key={data.id}
            />
          );
        })}
      </Notes>
    </div>
  );
}

export default Home;
