import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoSearchSharp } from 'react-icons/io5'
import { LuMoon, LuSunMedium } from 'react-icons/lu'
import { RiAddLine, RiMenuFoldLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@store/index'
import { toggleSideMenu } from '@store/slices/folders'
import { useTheme } from '@hooks/useTheme'
import { UserLogo } from '@components/layouts/user/logo/UserLogo'
import { MenuContainer } from '@components/ui/menu/container/MenuContainer'

import { UserMenu } from '../menu/user/UserMenu'
import { HeaderModals } from '../modal/HeaderModals'
import { AddModal } from '../modal/insert/AddModal'
import styles from './Header.module.scss'

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [userMenu, setUserMenu] = useState<boolean>(false)
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const [addFolderModal, setAddFolderModal] = useState<boolean>(false)
  const [searchModal, setSearchModal] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: RootState) => state.user.userData)
  const sideMenu = useSelector((state: RootState) => state.folders.openSideMenu)

  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <HeaderModals
        addFolderModal={addFolderModal}
        searchModal={searchModal}
        uploadModal={uploadModal}
        setAddFolderModal={setAddFolderModal}
        setSearchModal={setSearchModal}
        setUploadModal={setUploadModal}
        menu={menu}
        setMenu={setMenu}
      />

      <div className={styles.header}>
        <div className={styles.tools}>
          {!sideMenu && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              onClick={() => dispatch(toggleSideMenu())}
              className={styles.addButton}>
              <RiMenuFoldLine />
            </motion.button>
          )}

          <MenuContainer
            element={
              <AddModal
                setOpenMenu={setOpenMenu}
                setUploadModal={setUploadModal}
                setAddFolderModal={setAddFolderModal}
              />
            }
            open={openMenu}
            setOpen={setOpenMenu}
            position='left'>
            <motion.button
              whileHover={{ scale: 1.2 }}
              className={styles.addButton}>
              <RiAddLine />
            </motion.button>
          </MenuContainer>

          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => setSearchModal(true)}
            className={styles.addButton}>
            <IoSearchSharp />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => setMenu(true)}
            className={styles.addButton}>
            <IoSearchSharp />
          </motion.button>
        </div>
        <div className={styles.user}>
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleTheme}
            className={styles.addButton}>
            {theme === 'light' ? <LuSunMedium /> : <LuMoon />}
          </motion.button>
          <MenuContainer
            element={<UserMenu />}
            open={userMenu}
            setOpen={setUserMenu}>
            <UserLogo user={user} />
          </MenuContainer>
        </div>
      </div>
    </>
  )
}
