import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./slices/files";
import foldersReducer from "./slices/folders";

export const store = configureStore({
  reducer: {
    files: filesReducer,
    folders: foldersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
