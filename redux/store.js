import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import state from "./stateSlice";

export const store = configureStore({
  reducer: {
    user,
    state,
  },
});
