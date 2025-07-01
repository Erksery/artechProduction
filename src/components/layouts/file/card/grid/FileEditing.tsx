import { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoMdMore } from 'react-icons/io'

import { usePortalModal } from '@hooks/modal/usePortalModal'
import { MenuContainer } from '@components/ui/menu/container/MenuContainer'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

import { useEditFile } from '../../hooks/useEditFile'
import { FileModalViewer } from '../../modals/view/FileModalViewer'
import { FileViewTools } from '../../modals/view/FileViewTools'
import { FileMenu } from '../menu/FileMenu'
import { FileCardProps } from './FileCard'
import styles from './FileCard.module.scss'

interface Props extends FileCardProps {
  activeFolder: string | undefined
}

export const FileEditing = ({ file, i, activeFolder }: Props) => {
  const [fileMenu, setFileMenu] = useState(false)

  const { editMode, editing, inputRef, setEditValue, submitEditFile } =
    useEditFile()
  const { modalOpen, handleOpenModal, handleCloseModal } = usePortalModal()

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
                openPortalModal={handleOpenModal}
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

  return (
    <>
      <PortalModal
        isOpen={modalOpen}
        close={handleCloseModal}
        className={styles.viewModal}
        footer={<FileViewTools />}>
        <FileModalViewer activeFolder={activeFolder} />
      </PortalModal>
      {editFileMode()}
    </>
  )
}
