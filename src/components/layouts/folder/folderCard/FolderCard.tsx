import React from "react";
import styles from "./FolderCard.module.scss";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { MdMoreVert } from "react-icons/md";

export const FolderCard = () => {
  return (
    <div className={styles.folderCard}>
      <div className={styles.container}>
        <FcOpenedFolder className={styles.icon} />
        <div className={styles.info}>
          FolderCard
          <p>Создал: Erksery</p>
        </div>
      </div>

      <div className={styles.button}>
        <button>
          <MdMoreVert className={styles.moreIcon} />
        </button>
      </div>
    </div>
  );
};
