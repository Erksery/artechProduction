import React from "react";
import styles from "./SideMenu.module.scss";
import { FolderCard } from "../folder/folderCard/FolderCard";

export const SideMenu = () => {
  return (
    <div className={styles.sideMenuContainer}>
      <div className={styles.menu}>
        <FolderCard />
      </div>
    </div>
  );
};
