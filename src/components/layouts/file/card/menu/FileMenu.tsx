import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@store/index'
import { FileData } from '@interfaces/file'
import { useDownload } from '@components/layouts/file/hooks/useDownload'
import { MenuButton } from '@components/ui/menu/button/MenuButton'

import styles from './FileMenu.module.scss'
import { getFileMenuButtons } from './FileMenuButtons'

interface FileMenuProps {
  file: FileData
  fileId: string
  folderId: string | undefined
  activeFile: number
  close: () => void
  editMode: () => void
  setOpenViewModal: (open: boolean) => void
  setOpenDeleteModal: (open: boolean) => void
}
export const FileMenu: React.FC<FileMenuProps> = ({
  file,
  fileId,
  activeFile,
  close,
  editMode,
  folderId,
  setOpenViewModal,
  setOpenDeleteModal
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { downloadFile } = useDownload()
  const user = useSelector((state: RootState) => state.user.userData)
  const buttons = getFileMenuButtons(
    downloadFile,
    close,
    editMode,
    activeFile,
    dispatch,
    fileId,
    file,
    folderId,
    user,
    setOpenViewModal,
    setOpenDeleteModal
  )

  return (
    <div className={styles.menu}>
      {buttons.map(button => (
        <MenuButton
          key={button.id}
          event={button.event}
          title={button.title}
          icon={button.icon}
          height={40}
          red={button.red}
          disabled={button.disabled}
        />
      ))}
    </div>
  )
}
