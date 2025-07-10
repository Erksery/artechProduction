import React, { useEffect } from 'react'
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
import { PullMenu } from '@components/ui/menu/pull/PullMenu'

import styles from './SideMenu.module.scss'

interface Props {
  isMobile: boolean
}

export const FoldersMenu = React.memo(({ isMobile }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const folders = useSelector((state: RootState) => state.folders.folders)
  const { getFolders } = useGetFolders()
  const { createFolder } = useCreateFolder()

  return (
    <motion.div
      className={`${styles.sideMenuContainer} ${isMobile && styles.mobile}`}>
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
          <div className={styles.boundary}>Доступные вам папки отсутствуют</div>
        )}
      </div>
    </motion.div>
  )
})

export const SideMenu = () => {
  const dispatch = useDispatch<AppDispatch>()

  const openSideMenu = useSelector(
    (state: RootState) => state.folders.openSideMenu
  )

  const { isMobile } = useMobileView()

  useEffect(() => {
    dispatch(setSideMenu(!isMobile))
  }, [isMobile, dispatch])

  const menuContent = (
    <FoldersMenu
      key={isMobile ? 'mobile' : 'desktop'}
      isMobile={isMobile}
    />
  )

  return (
    <>
      <AnimatePresence>
        {isMobile && openSideMenu && (
          <PullMenu
            header={false}
            isOpen={openSideMenu}
            closeModal={() => dispatch(setSideMenu(false))}>
            {menuContent}
          </PullMenu>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isMobile && openSideMenu && menuContent}
      </AnimatePresence>
    </>
  )
}
