import React, { useEffect, useState } from "react";
import styles from "./FilesList.module.scss";
import { FileCard } from "../fileCard/FileCard";
import { FileData } from "../../../../interfaces/file";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

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
  const editMode = useSelector((state: RootState) => state.files.editMode);

  useEffect(() => {
    !editMode && setSelectedFiles([]);
  }, [editMode]);

  const addSelectedFile = (file: number) => {
    editMode && setSelectedFiles((prev) => [...prev, file]);
  };
  const deleteSelectedFile = (file: number) => {
    editMode && setSelectedFiles(() => selectedFiles.filter((f) => f !== file));
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
