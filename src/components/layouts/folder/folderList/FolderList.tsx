import React, { useMemo, useState, useEffect } from "react";
import { Reorder, motion } from "framer-motion";
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

  const [orderedFolders, setOrderedFolders] = useState<FolderData[]>(() => {
    const storedFolders = localStorage.getItem("orderedFolders");
    return storedFolders ? JSON.parse(storedFolders) : parentFolders;
  });

  useEffect(() => {
    localStorage.setItem("orderedFolders", JSON.stringify(orderedFolders));
  }, [orderedFolders]);

  return (
    <Reorder.Group
      axis="y"
      values={orderedFolders}
      onReorder={setOrderedFolders}
      className={styles.list}
      as="div"
    >
      {orderedFolders.map((folder) => (
        <Reorder.Item key={folder.id} value={folder} as="div">
          <FolderCard folder={folder} folders={folders} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
