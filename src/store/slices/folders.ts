import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FolderData } from "./../../interfaces/folder";

interface FoldersState {
  folders: FolderData[];
  activeFolder: string | undefined;
}

const initialState: FoldersState = {
  folders: [],
  activeFolder: undefined,
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<FolderData[]>) => {
      state.folders = action.payload;
    },
    addFolder: (state, action: PayloadAction<FolderData[]>) => {
      state.folders = [...state.folders, ...action.payload];
    },
    setActiveFolder: (state, action: PayloadAction<string | undefined>) => {
      state.activeFolder = action.payload;
    },
  },
});

export const { setFolders, addFolder, setActiveFolder } = foldersSlice.actions;

export default foldersSlice.reducer;
