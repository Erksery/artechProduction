import React, { useState } from "react";
import styles from "./FilesList.module.scss";
import { FileCard } from "../fileCard/FileCard";
import { FileData } from "../../../../interfaces/file";

interface FilesListProps {
  files: FileData[];
  cardSize: number;
  padding?: number;
}
const FilesListComponent: React.FC<FilesListProps> = ({
  files,
  cardSize,
  padding = 5,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const addSelectedFile = (file: number) => {
    setSelectedFiles((prev) => [...prev, file]);
  };
  const deleteSelectedFile = (file: number) => {
    setSelectedFiles(() => selectedFiles.filter((f) => f !== file));
  };
  console.log("rerender file list");
  return (
    <div
      style={{
        padding: padding,
        gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))`,
      }}
      className={styles.table}
    >
      {files &&
        files.map((file, index) => (
          <FileCard
            file={file}
            key={file.id}
            i={index}
            selected={selectedFiles}
            addSelectedFile={addSelectedFile}
            deleteSelectedFile={deleteSelectedFile}
          />
        ))}
    </div>
  );
};

export const FilesList = React.memo(FilesListComponent);
