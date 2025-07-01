import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@store/index'
import { FileData } from '@interfaces/file'
import { useModal } from '@hooks/modal/useModal'
import { useDownload } from '@components/layouts/file/hooks/useDownload'
import { MenuButton } from '@components/ui/menu/button/MenuButton'

import styles from './FileMenu.module.scss'
import { getFileMenuButtons } from './FileMenuButtons'
import { useDeleteFile } from './hooks/useDeleteFile'

interface FileMenuProps {
  file: FileData
  fileId: string
  folderId: string | undefined
  activeFile: number
  close: () => void
  editMode: () => void
  openPortalModal: () => void
}
export const FileMenu: React.FC<FileMenuProps> = ({
  file,
  fileId,
  activeFile,
  close,
  editMode,
  folderId,
  openPortalModal
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { openModal, closeModal } = useModal()
  const { fileDelete } = useDeleteFile()
  const { downloadFile } = useDownload()
  const user = useSelector((state: RootState) => state.user.userData)
  const buttons = getFileMenuButtons(
    openModal,
    closeModal,
    downloadFile,
    close,
    editMode,
    activeFile,
    fileDelete,
    dispatch,
    fileId,
    file,
    folderId,
    user,
    openPortalModal
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
