import React from "react";
import styles from "./SideMenu.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

import { RiAddLine } from "react-icons/ri";

import { useCreateFolder } from "../../folder/modals/insert/hook/useCreateFolder";
import { useGetFolders } from "../../../../hooks/useGetFolders";
import { FolderListFlat } from "../../folder/list/list/FolderListFlat";

export const SideMenu: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  const { createFolder } = useCreateFolder();

  useGetFolders();

  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.menu}>
        <div className={styles.tools}>
          <motion.button
            onClick={() => createFolder("New Folder")}
            whileHover={{ scale: 1.2 }}
            className={styles.addButton}
          >
            <RiAddLine />
          </motion.button>
        </div>
        {folders.length !== 0 ? (
          <FolderListFlat folders={folders} />
        ) : (
          <div className={styles.boundary}>Доступные вам папки отсутствуют</div>
        )}
      </div>
    </div>
  );
};
