import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./Slices/noteSlice";
import uiReducer from "./Slices/uiSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});
