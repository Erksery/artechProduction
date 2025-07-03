import { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoMdMore } from 'react-icons/io'

import { MenuContainer } from '@components/ui/menu/container/MenuContainer'

import { useEditFile } from '../../hooks/useEditFile'
import { FileMenu } from '../menu/FileMenu'
import { FileCardProps } from './FileCard'
import styles from './FileCard.module.scss'

interface Props extends FileCardProps {
  activeFolder: string | undefined

  setOpenDeleteModal: (open: boolean) => void
  setOpenViewModal: (open: boolean) => void
}

export const FileEditing = ({
  file,
  i,
  activeFolder,
  setOpenDeleteModal,
  setOpenViewModal
}: Props) => {
  const [fileMenu, setFileMenu] = useState(false)

  const { editMode, editing, inputRef, setEditValue, submitEditFile } =
    useEditFile()

  const editFileMode = () => {
    if (editing) {
      return (
        <form
          onSubmit={e => submitEditFile(e, file.folderId, file.id)}
          className={styles.editContainer}>
          <input
            ref={inputRef}
            defaultValue={file.originalFilename}
            onChange={e => setEditValue(e.target.value)}
            onBlur={e => {
              const nextFocused = e.relatedTarget

              if (!nextFocused || nextFocused.tagName !== 'BUTTON') {
                editMode()
              }
            }}
          />
          <button type='submit'>
            <FaCheck />
          </button>
        </form>
      )
    } else {
      return (
        <>
          <p className={styles.name}>{file.originalFilename}</p>
          <MenuContainer
            element={
              <FileMenu
                file={file}
                fileId={file.id}
                folderId={activeFolder}
                activeFile={i}
                close={() => setFileMenu(false)}
                editMode={editMode}
                setOpenViewModal={setOpenViewModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            }
            open={fileMenu}
            setOpen={setFileMenu}
            blur={true}>
            <button className={styles.menuButton}>
              <IoMdMore />
            </button>
          </MenuContainer>
        </>
      )
    }
  }

  return <>{editFileMode()}</>
}
