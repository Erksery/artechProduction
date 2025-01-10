import { FileData } from "./../../interfaces/file";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilesState {
  files: FileData[];
}

const initialState: FilesState = {
  files: [],
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<FileData[]>) => {
      state.files = action.payload;
    },
    addFiles: (state, action: PayloadAction<FileData[]>) => {
      state.files = [...state.files, ...action.payload];
    },
  },
});

export const { setFiles } = filesSlice.actions;

export default filesSlice.reducer;
