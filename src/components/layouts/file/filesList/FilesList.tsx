import React from "react";
import styles from "./FilesList.module.scss";
import { FileCard } from "../fileCard/FileCard";

interface FilesListProps {}

const FilesListComponent: React.FC<FilesListProps> = () => {
  console.log("rerender file list");
  return (
    <div className={styles.table}>
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <FileCard key={index} i={index} />
        ))}
    </div>
  );
};

export const FilesList = React.memo(FilesListComponent);
