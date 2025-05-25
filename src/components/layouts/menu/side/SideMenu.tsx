import React, { useEffect } from "react";
import styles from "./SideMenu.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";

import { RiAddLine, RiMenuFoldLine } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";

import { useCreateFolder } from "../../folder/modals/insert/hook/useCreateFolder";
import { useGetFolders } from "../../../../hooks/useGetFolders";
import { FolderListFlat } from "../../folder/list/list/FolderListFlat";
import { useMobileView } from "../../../../hooks/useMobileView";
import { setSideMenu, toggleSideMenu } from "../../../../store/slices/folders";

export const SideMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const folderSelector = useSelector((state: RootState) => state.folders);

  const { createFolder } = useCreateFolder();
  const { isMobile } = useMobileView();

  const { getFolders } = useGetFolders();

  useEffect(() => {
    dispatch(isMobile ? setSideMenu(false) : setSideMenu(true));
  }, [isMobile]);

  return (
    <AnimatePresence>
      {folderSelector.openSideMenu && (
        <motion.div
          className={styles.sideMenuContainer}
          initial={
            isMobile ? { x: -450, opacity: 0 } : { width: 0, opacity: 0 }
          }
          animate={isMobile ? { x: 0, opacity: 1 } : { width: 300, opacity: 1 }}
          exit={isMobile ? { x: -450, opacity: 0 } : { width: 0, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className={styles.menu}>
            <div className={styles.tools}>
              <div className={styles.block}>
                <motion.button
                  onClick={() => createFolder("New Folder")}
                  whileHover={{ scale: 1.2 }}
                  className={styles.addButton}
                >
                  <RiAddLine />
                </motion.button>
                <motion.button
                  onClick={getFolders}
                  whileHover={{ scale: 1.2 }}
                  className={styles.addButton}
                >
                  <AiOutlineReload />
                </motion.button>
              </div>

              <motion.button
                onClick={() => dispatch(toggleSideMenu())}
                whileHover={{ scale: 1.2 }}
                className={styles.addButton}
              >
                <RiMenuFoldLine />
              </motion.button>
            </div>
            {folderSelector.folders.length !== 0 ? (
              <FolderListFlat folders={folderSelector.folders} />
            ) : (
              <div className={styles.boundary}>
                Доступные вам папки отсутствуют
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
