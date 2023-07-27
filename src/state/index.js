import { createSlice } from "@reduxjs/toolkit";

const initialState = { mode: "light", user: null, token: null, notes: [] };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sets Darkmode/Lightmode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Set User + JWT Token
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Removes User + JWT Token
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setMode, setUser } = userSlice.actions; // Used in Components
export default userSlice.reducer; // Used in Store
