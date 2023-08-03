import { createSlice } from "@reduxjs/toolkit";

let dev = "http://localhost:5000";
let prod = "https://carrums-merntut-server.onrender.com";

const initialState = {
  mode: "light", // Dark/Light Mode
  email: null, // Email, used as Username
  google_id: null, // Google 'sub' value, used as Password
  chan_token: null, // Backend JWTToken, used as ID
  username: null,
  first_name: null,
  last_name: null,
  picturePath: null, // URL of current profile pic
  notes: [],
  url: process.env.NODE_ENV === "development" ? dev : prod, // Switches URL based on environment type
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
    // Set Chan JWT Token
    setToken: (state, action) => {
      state.chan_token = action.payload.chan_token;
    },
    // Set User Data (username, first_name, last_name, picturePath)
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.picturePath = action.payload.picturePath;
    },
    // Removes User Login + JWT Token
    setLogout: (state) => {
      state.chan_token = null;
      state.email = null;
      state.google_id = null;
    },
  },
});

export const { setMode, setLogin, setToken, setUserData, setLogout } =
  userSlice.actions; // Used in Components
export default userSlice.reducer; // Used in Store
