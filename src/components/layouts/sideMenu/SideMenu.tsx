import React from "react";
import styles from "./SideMenu.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FolderList } from "../folder/folderList/FolderList";

import { RiAddLine } from "react-icons/ri";
import { useCreateFolder } from "../folder/addFolderModal/hook/useCreateFolder";

export const SideMenu: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  const { createFolder } = useCreateFolder();
  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.menu}>
        <div className={styles.tools}>
          <motion.button
            onClick={() => createFolder(undefined, true)}
            whileHover={{ scale: 1.2 }}
            className={styles.addButton}
          >
            <RiAddLine />
          </motion.button>
        </div>
        <FolderList folders={folders} />
      </div>
    </div>
  );
};
