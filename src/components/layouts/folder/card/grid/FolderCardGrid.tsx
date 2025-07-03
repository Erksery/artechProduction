import { useState } from 'react'
import { FcFolder } from 'react-icons/fc'
import { MdMoreVert } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { FolderData } from '@interfaces/folder'
import { MenuContainer } from '@components/ui/menu/container/MenuContainer'

import { useFolderCardLogic } from '../hooks/useFolderCardLogic'
import { FolderMenu } from '../menu/FolderMenu'
import styles from './FolderCardGrid.module.scss'

interface Props {
  folder: FolderData
}
export const FolderCardGrid = ({ folder }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { setOpenDeleteModal } = useFolderCardLogic()
  return (
    <Link
      to={`/folder/${folder.id}`}
      className={styles.card}>
      <div className={styles.infoContainer}>
        <div>
          <FcFolder />
        </div>
        <h3>{folder.name}</h3>
      </div>
      <MenuContainer
        element={
          <FolderMenu
            setOpenDeleteModal={setOpenDeleteModal}
            folder={folder}
            close={() => setMenuOpen(false)}
          />
        }
        open={menuOpen}
        setOpen={setMenuOpen}>
        <button
          className={styles.button}
          onClick={() => setMenuOpen(true)}>
          <MdMoreVert />
        </button>
      </MenuContainer>
    </Link>
  )
}
