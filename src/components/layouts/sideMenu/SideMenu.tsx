import React from "react";
import styles from "./SideMenu.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FolderList } from "../folder/folderList/FolderList";

export const SideMenu: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);
  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.menu}>
        <FolderList folders={folders} />
      </div>
    </div>
  );
};
