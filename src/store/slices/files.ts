import { FileData } from "./../../interfaces/file";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filter {
  name: string;
  value: string;
}

interface Order {
  name: string;
  value: string;
}

interface FilesState {
  files: FileData[];
  filter: Filter;
  order: Order;
  activeFile: number;
  editMode: boolean;
}

const initialState: FilesState = {
  files: [],
  filter: { name: "mimeType", value: "" },
  order: { name: "originalFilename", value: "asc" },
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
    edit: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload.id);
      state.files = [...state.files, ...action.payload.file];
    },
    updateFile: (state, action: PayloadAction<FileData>) => {
      state.files = state.files.map((file) =>
        file.id === action.payload.id ? action.payload : file
      );
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },

    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter.name = action.payload.name;
      state.filter.value = action.payload.value;
    },
  },
});

export const {
  setFiles,
  addFiles,
  setActiveFile,
  deleteFile,
  edit,
  toggleEditMode,
  updateFile,
  setFilter,
} = filesSlice.actions;

export default filesSlice.reducer;
