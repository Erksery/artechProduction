import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch } from '@store/index'
import { setActiveFolder } from '@store/slices/folders'
import { FolderData } from '@interfaces/folder'
import { useGetUser } from '@components/layouts/user/hooks/useGetUser'

import { FolderModals } from '../../modals/FolderModals'
import { useDeleteFolder } from '../hooks/useDeleteFolder'
import { FileType, useFolderCardLogic } from '../hooks/useFolderCardLogic'
import { FolderCardInfo } from './FolderCardInfo'
import { FolderCardTools } from './FolderCardTools'
import { SubFolderList } from './SubFolderList'

interface FolderCardProps {
  folder: FolderData
  folders: FolderData[]
}

export const FolderCardList = ({ folder, folders }: FolderCardProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    menuOpen,
    setMenuOpen,
    subListOpen,
    linkRef,
    activeFolder,
    closeMenu,
    toggleListOpen,
    dropFile,
    folderCardClassName,
    openDeleteModal,
    setOpenDeleteModal,
    openEditModal,
    setOpenEditModal,
    openPropertiesModal,
    setOpenPropertiesModal
  } = useFolderCardLogic()

  const { deleteFolder } = useDeleteFolder()

  const { getUser, userData } = useGetUser()

  const subFolders = useMemo(
    () => folders.filter(subFolder => subFolder.inFolder === folder.id),
    [folders, folder.id]
  )

  const [{ isOver }, drop] = useDrop({
    accept: 'FILE',
    drop: (item: FileType) => {
      dropFile(folder, item)
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  useEffect(() => {
    const node = linkRef.current
    if (node) {
      drop(node)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drop])

  useEffect(() => {
    getUser(folder.creator)
  }, [folder.creator, getUser])

  return (
    <>
      <FolderModals
        folder={folder}
        deleteFolder={deleteFolder}
        openEditModal={openEditModal}
        openPropertiesModal={openPropertiesModal}
        openDeleteModal={openDeleteModal}
        setOpenEditModal={setOpenEditModal}
        setOpenPropertiesModal={setOpenPropertiesModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <motion.div animate={{ scale: isOver ? 0.95 : 1 }}>
        <Link
          ref={linkRef}
          key={folder.id}
          to={`/folder/${folder.id}`}
          onClick={() => dispatch(setActiveFolder(folder.id))}
          className={folderCardClassName(folder.id, isOver)}
          draggable={false}>
          <FolderCardInfo
            activeFolder={activeFolder}
            folder={folder}
            userData={userData}
          />

          <FolderCardTools
            folder={folder}
            subFolders={subFolders}
            toggleListOpen={toggleListOpen}
            subListOpen={subListOpen}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            closeMenu={closeMenu}
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenEditModal={setOpenEditModal}
            setOpenPropertiesModal={setOpenPropertiesModal}
          />
        </Link>
      </motion.div>

      <SubFolderList
        open={subListOpen}
        subFolders={subFolders}
        toggleOpen={toggleListOpen}
        folders={folders}
      />
    </>
  )
}
