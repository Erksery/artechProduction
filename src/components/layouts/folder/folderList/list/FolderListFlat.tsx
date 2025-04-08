import React, { useMemo } from "react";
import styles from "./FolderListFlat.module.scss";
import { FolderData } from "../../../../../interfaces/folder";
import { FolderCardList } from "../../folderCard/list/FolderCardList";

interface FolderListProps {
  folders: FolderData[];
}

export const FolderListFlat: React.FC<FolderListProps> = ({ folders }) => {
  const parentFolders = useMemo(() => {
    return folders.filter((folder) => folder.inFolder === null);
  }, [folders]);

  return (
    <div className={styles.list}>
      {parentFolders.map((folder) => (
        <FolderCardList key={folder.id} folder={folder} folders={folders} />
      ))}
    </div>
  );
};
