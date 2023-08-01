import { createSlice } from "@reduxjs/toolkit";

let dev = "http://localhost:5000";
let prod = "https://carrums-merntut-server.onrender.com";

const initialState = {
  mode: "light", // Dark/Light Mode
  email: null, // Email, used as Username
  google_id: null, // Google 'sub' value, used as Password
  chan_token: null, // Backend JWTToken, used as ID
  userName: null,
  firstName: null,
  lastName: null,
  profileUrl: null,
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
    // Set User Data (userName, firstName, lastName, profileUrl)
    setUserData: (state, action) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profileUrl = action.payload.profileUrl;
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
