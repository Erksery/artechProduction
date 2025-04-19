import React, { useEffect, useState } from "react";
import styles from "./FilesList.module.scss";

import { FileData } from "../../../../interfaces/file";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { FileCard } from "../card/grid/FileCard";
import { FileSkeleton } from "../card/grid/FileSkeleton";

interface FilesListProps {
  files: FileData[];
  padding?: number;
  loading: boolean;
}
const FilesListComponent: React.FC<FilesListProps> = ({
  files,
  padding = 0,
  loading,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const editMode = useSelector((state: RootState) => state.files.editMode);

  useEffect(() => {
    !editMode && setSelectedFiles([]);
  }, [editMode]);

  const addSelectedFile = (file: string) => {
    editMode && setSelectedFiles((prev) => [...prev, file]);
  };
  const deleteSelectedFile = (file: string) => {
    editMode && setSelectedFiles(() => selectedFiles.filter((f) => f !== file));
  };

  console.log("rerender file list", loading);
  return (
    <div
      style={{
        padding: padding,
      }}
      className={styles.table}
    >
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <FileSkeleton key={index} />
        ))
      ) : files.length > 0 ? (
        files.map((file, index) => (
          <FileCard
            file={file}
            key={file.id}
            i={index}
            selected={selectedFiles}
            addSelectedFile={addSelectedFile}
            deleteSelectedFile={deleteSelectedFile}
          />
        ))
      ) : (
        <div>Файлы не найдены</div>
      )}
    </div>
  );
};

export const FilesList = React.memo(FilesListComponent);
