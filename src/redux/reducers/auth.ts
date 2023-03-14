import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    validationCode: "",
    email: "",
    rememberMe: false,
    isLoading: false,
    isLogged: false,
    screen: "login",
  },
  reducers: {
    validation_code_updated: (state, action) => {
      state.validationCode = action.payload;
    },
    email_updated: (state, action) => {
      state.email = action.payload;
    },
    remember_me_updated: (state, action) => {
      state.rememberMe = action.payload;
    },
    screen_updated: (state, action) => {
      state.screen = action.payload;
    },
    loading_started: (state) => {
      state.isLoading = true;
    },
    loading_finished: (state) => {
      state.isLoading = false;
    },
    user_authenticated: (state) => {
      state.isLogged = true;
    },
    user_unauthenticated: (state) => {
      state.isLogged = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
