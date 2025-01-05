import React from "react";
import styles from "./FilesList.module.scss";
import { FileCard } from "../fileCard/FileCard";

interface FilesListProps {
  cardSize: number;
  padding: number;
}

const FilesListComponent: React.FC<FilesListProps> = ({
  cardSize,
  padding = 5,
}) => {
  console.log("rerender file list");
  return (
    <div
      style={{
        padding: padding,
        gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))`,
      }}
      className={styles.table}
    >
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <FileCard key={index} i={index} />
        ))}
    </div>
  );
};

export const FilesList = React.memo(FilesListComponent);
