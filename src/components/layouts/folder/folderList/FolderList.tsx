import React, { useMemo } from "react";
import styles from "./FolderList.module.scss";
import { FolderCard } from "../folderCard/FolderCard";
import { FolderData } from "../../../../interfaces/folder";

interface FolderListProps {
  folders: FolderData[];
}

export const FolderList: React.FC<FolderListProps> = ({ folders }) => {
  const parentFolders = useMemo(() => {
    return folders.filter((folder) => folder.inFolder === null);
  }, [folders]);

  return (
    <div className={styles.list}>
      {parentFolders.map((folder) => (
        <FolderCard folder={folder} folders={folders} />
      ))}
    </div>
  );
};
