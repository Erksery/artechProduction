import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { FileData } from '@interfaces/file'
import { FolderData } from '@interfaces/folder'
import { useEditFile } from '@components/layouts/file/hooks/useEditFile'

import styles from '../list/FolderCardList.module.scss'

export interface FileType {
  file: FileData
}

export const useFolderCardLogic = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [subListOpen, setSubListOpen] = useState(false)

  const linkRef = useRef<HTMLAnchorElement>(null)

  const selectedFiles = useSelector(
    (state: RootState) => state.files.selectedFiles
  )
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  )

  const { editFile } = useEditFile()

  const toggleListOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSubListOpen(prev => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const dropFile = (folder: FolderData, item: FileType) => {
    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        editFile({
          folderId: activeFolder,
          fileId: file,
          editData: { folderId: folder.id }
        })
      })
    } else {
      editFile({
        folderId: activeFolder,
        fileId: item.file.id,
        editData: { folderId: folder.id }
      })
    }
  }
  const folderCardClassName = (folderId: string, isOver: boolean): string => {
    return `${styles.folderCard} ${
      activeFolder === folderId ? styles.active : ''
    } ${isOver ? styles.drop : ''}`
  }

  return {
    menuOpen,
    setMenuOpen,
    subListOpen,
    setSubListOpen,
    linkRef,
    selectedFiles,
    activeFolder,
    toggleListOpen,
    closeMenu,
    dropFile,
    folderCardClassName
  }
}
