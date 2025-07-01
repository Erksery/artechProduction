import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AiOutlineReload } from 'react-icons/ai'
import { RiAddLine, RiMenuFoldLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@store/index'
import { setSideMenu, toggleSideMenu } from '@store/slices/folders'
import { useMobileView } from '@hooks/useMobileView'
import { useGetFolders } from '@components/layouts/folder/hooks/useGetFolders'
import { FolderListFlat } from '@components/layouts/folder/list/list/FolderListFlat'
import { useCreateFolder } from '@components/layouts/folder/modals/insert/hook/useCreateFolder'

import styles from './SideMenu.module.scss'

export const SideMenu = () => {
  const dispatch = useDispatch<AppDispatch>()

  const folders = useSelector((state: RootState) => state.folders.folders)
  const openSideMenu = useSelector(
    (state: RootState) => state.folders.openSideMenu
  )

  const { getFolders } = useGetFolders()
  const { isMobile } = useMobileView()

  const { createFolder } = useCreateFolder()

  useEffect(() => {
    dispatch(setSideMenu(isMobile ? false : true))
  }, [isMobile, dispatch])

  return (
    <AnimatePresence>
      {openSideMenu && (
        <motion.div className={styles.sideMenuContainer}>
          <div className={styles.menu}>
            <div className={styles.tools}>
              <div className={styles.block}>
                <motion.button
                  onClick={() => createFolder()}
                  whileHover={{ scale: 1.2 }}
                  className={styles.addButton}>
                  <RiAddLine />
                </motion.button>
                <motion.button
                  onClick={getFolders}
                  whileHover={{ scale: 1.2 }}
                  className={styles.addButton}>
                  <AiOutlineReload />
                </motion.button>
              </div>

              <motion.button
                onClick={() => dispatch(toggleSideMenu())}
                whileHover={{ scale: 1.2 }}
                className={styles.addButton}>
                <RiMenuFoldLine />
              </motion.button>
            </div>
            {folders.length !== 0 ? (
              <FolderListFlat folders={folders} />
            ) : (
              <div className={styles.boundary}>
                Доступные вам папки отсутствуют
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
