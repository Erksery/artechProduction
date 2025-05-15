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
  activeFile: string;
  activeEditMode: boolean;
  selectedFiles: string[];
  searchFile: string;
}

const initialState: FilesState = {
  files: [],
  filter: { name: "mimeType", value: "" },
  order: { name: "originalFilename", value: "asc" },
  activeFile: "",
  activeEditMode: false,
  selectedFiles: [],
  searchFile: "",
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
      const fileIndex = state.files.findIndex(
        (file) => file.id === action.payload.id
      );
      if (fileIndex !== -1) {
        state.files[fileIndex] = action.payload;
      }
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
    toggleEditMode: (state) => {
      state.activeEditMode = !state.activeEditMode;
    },

    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter.name = action.payload.name;
      state.filter.value = action.payload.value;
    },

    setOrder: (state, action) => {
      if (action.payload) {
        state.order.name = action.payload;
      }

      state.order.value = state.order.value === "asc" ? "desc" : "asc";
    },

    addSelectedFile: (state, action) => {
      state.selectedFiles = [...state.selectedFiles, action.payload];
    },

    deleteSelectedFile: (state, action) => {
      state.selectedFiles = state.selectedFiles.filter(
        (f) => f !== action.payload
      );
    },
    toggleSelectedFile: (state, action) => {
      const selectedFile = state.selectedFiles.includes(action.payload);
      if (selectedFile) {
        state.selectedFiles = state.selectedFiles.filter(
          (f) => f !== action.payload
        );
      } else {
        state.selectedFiles = [...state.selectedFiles, action.payload];
      }
    },
    setSelectedFile: (state, action) => {
      state.selectedFiles = action.payload;
    },
    setSearchFile: (state, action) => {
      state.searchFile = action.payload;
    },
    clearSearchFile: (state) => {
      state.searchFile = "";
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
  setOrder,
  addSelectedFile,
  deleteSelectedFile,
  setSelectedFile,
  toggleSelectedFile,
  setSearchFile,
  clearSearchFile,
} = filesSlice.actions;

export default filesSlice.reducer;
