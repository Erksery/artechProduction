import { FileData } from "./../../interfaces/file";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilesState {
  files: FileData[];
  activeFile: number;
}

const initialState: FilesState = {
  files: [],
  activeFile: 0,
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
    setActiveFile: (state, action) => {
      state.activeFile = action.payload;
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
  },
});

export const { setFiles, addFiles, setActiveFile, deleteFile } =
  filesSlice.actions;

export default filesSlice.reducer;
