import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginHandler: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    logoutHandler: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginHandler, logoutHandler } = AuthSlice.actions;
export default AuthSlice.reducer;
