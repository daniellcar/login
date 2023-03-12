import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { signInServiceMock } from "../../services/mocks/auth-service-mock";
import { SignInClickProps } from "../../pages/auth/Auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    validationCode: "",
    password: "",
    email: "",
    rememberMe: false,
    isLoading: false,
    isLogged: false,
    isTransitioning: false
  },
  reducers: {
    validation_code_updated: (state, action) => {
      state.validationCode = action.payload;
    },
    password_updated: (state, action) => {
      state.password = action.payload;
    },
    email_updated: (state, action) => {
      state.email = action.payload;
    },
    remember_me_updated: (state, action) => {
      state.rememberMe = action.payload;
    },
    loading_started: (state) => {
      state.isLoading = true;
    },
    loading_finished: (state) => {
      state.isLoading = false;
    },
    user_authenticated: (state) => {
      state.isLogged = true;
      return;
    },
    user_unauthenticated: (state) => {
      state.isLogged = false;
      return;
    },
  },
});

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (payload: SignInClickProps, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(authActions.loading_started());
    await signInServiceMock(payload);
    dispatch(authActions.user_authenticated());
    dispatch(authActions.loading_finished());
  }
);

export const authActions = authSlice.actions;

export default authSlice.reducer;
