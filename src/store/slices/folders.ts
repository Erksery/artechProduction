import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FolderData } from './../../interfaces/folder'

interface FoldersState {
  folders: FolderData[]
  subFolders: FolderData[]
  activeFolder: string | undefined
  openSideMenu: boolean
}

const initialState: FoldersState = {
  folders: [],
  subFolders: [],
  activeFolder: undefined,
  openSideMenu: true
}

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<FolderData[]>) => {
      state.folders = action.payload
    },
    addFolder: (state, action: PayloadAction<FolderData[]>) => {
      state.folders = [...state.folders, ...action.payload]
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(
        folder => folder.id !== action.payload
      )
    },
    setActiveFolder: (state, action: PayloadAction<string | undefined>) => {
      state.activeFolder = action.payload
    },

    updateFolder: (state, action: PayloadAction<FolderData>) => {
      const folderIndex = state.folders.findIndex(
        folder => folder.id === action.payload.id
      )
      if (folderIndex !== -1) {
        state.folders[folderIndex] = action.payload
      }
    },
    toggleSideMenu: state => {
      state.openSideMenu = !state.openSideMenu
    },

    setSideMenu: (state, action) => {
      state.openSideMenu = action.payload
    }
  }
})

export const {
  setFolders,
  addFolder,
  removeFolder,
  setActiveFolder,
  updateFolder,
  toggleSideMenu,
  setSideMenu
} = foldersSlice.actions

export default foldersSlice.reducer
