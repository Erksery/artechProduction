import { FileData } from "./../../interfaces/file";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilesState {
  files: FileData[];
  activeFile: number;
  editMode: boolean;
}

const initialState: FilesState = {
  files: [],
  activeFile: 0,
  editMode: false,
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
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
  },
});

export const { setFiles, addFiles, setActiveFile, deleteFile, toggleEditMode } =
  filesSlice.actions;

export default filesSlice.reducer;
