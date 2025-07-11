import { IoChevronDownOutline } from 'react-icons/io5'
import { MdMoreVert } from 'react-icons/md'

import { FolderData } from '@interfaces/folder'
import { MenuContainer } from '@components/ui/menu/container/MenuContainer'

import { FolderMenu } from '../menu/FolderMenu'
import styles from './FolderCardList.module.scss'

interface Props {
  folder: FolderData
  subFolders: FolderData[]
  subListOpen: boolean
  menuOpen: boolean
  setOpenDeleteModal: (open: boolean) => void
  setOpenEditModal: (open: boolean) => void
  setOpenPropertiesModal: (open: boolean) => void
  toggleListOpen: (e: React.MouseEvent<HTMLElement>) => void
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeMenu: () => void
}

export const FolderCardTools = ({
  folder,
  subFolders,
  subListOpen,
  menuOpen,
  setMenuOpen,
  closeMenu,
  toggleListOpen,
  setOpenDeleteModal,
  setOpenEditModal,
  setOpenPropertiesModal
}: Props) => {
  return (
    <div className={styles.tools}>
      {subFolders.length > 0 && (
        <button
          className={styles.button}
          onClick={toggleListOpen}>
          <div style={{ transform: `rotate(${subListOpen ? 180 : 0}deg)` }}>
            <IoChevronDownOutline />
          </div>
        </button>
      )}
      <MenuContainer
        element={
          <FolderMenu
            setOpenDeleteModal={setOpenDeleteModal}
            folder={folder}
            close={closeMenu}
            setOpenEditModal={setOpenEditModal}
            setOpenPropertiesModal={setOpenPropertiesModal}
          />
        }
        open={menuOpen}
        setOpen={setMenuOpen}
        blur={true}>
        <button
          className={styles.button}
          onClick={() => setMenuOpen(true)}>
          <MdMoreVert />
        </button>
      </MenuContainer>
    </div>
  )
}
