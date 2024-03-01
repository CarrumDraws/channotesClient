import { createSlice } from "@reduxjs/toolkit";
import isMobile from "../components/helperFuncs/isMobile";
let dev = "http://localhost:5000";
let prod = "https://channotes-server.onrender.com";

const initialState = {
  mode: "light", // Dark/Light Mode
  email: null, // Email, used as Username
  google_id: null, // Google 'sub' value, used as Password
  chan_token: null, // Backend JWTToken, used as ID
  chan_id: null, // chan_id
  username: null,
  first_name: null,
  last_name: null,
  image: null, // URL of current profile pic
  notes: [],
  url: process.env.NODE_ENV === "development" ? dev : prod, // Switches URL based on environment type
  mobile: isMobile(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sets Darkmode/Lightmode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Set User Login
    setLogin: (state, action) => {
      state.email = action.payload.email;
      state.google_id = action.payload.google_id;
    },
    // Set ChanNotes Data
    setChanData: (state, action) => {
      state.chan_id = action.payload.chan_id;
      state.chan_token = action.payload.chan_token;
    },
    // Set User Data. Changable Data.
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image;
    },
    // Removes User Login + JWT Token
    setLogout: (state) => {
      state.email = null;
      state.google_id = null;
      state.chan_id = null;
      state.chan_token = null;
      state.username = null;
      state.first_name = null;
      state.last_name = null;
      state.image = null;
      state.notes = [];
    },
  },
});

export const { setMode, setLogin, setChanData, setUserData, setLogout } =
  userSlice.actions; // Used in Components
export default userSlice.reducer; // Used in Store
