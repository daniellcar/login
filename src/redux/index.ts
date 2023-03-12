import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "./slices/auth";
import subscribeActionMiddleware from "redux-subscribe-action";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: () => [subscribeActionMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
