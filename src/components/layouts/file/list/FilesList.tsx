import React, { useEffect } from "react";
import styles from "./FilesList.module.scss";

import { FileData } from "../../../../interfaces/file";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { FileCard } from "../card/grid/FileCard";
import { FileSkeleton } from "../card/grid/FileSkeleton";
import { setSelectedFile } from "../../../../store/slices/files";

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
  const dispatch = useDispatch<AppDispatch>();
  const editFile = useSelector((state: RootState) => state.files);

  useEffect(() => {
    !editFile.activeEditMode && dispatch(setSelectedFile([]));
  }, [editFile.activeEditMode]);

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
          <FileCard file={file} key={file.id} i={index} />
        ))
      ) : (
        <div>Файлы не найдены</div>
      )}
    </div>
  );
};

export const FilesList = React.memo(FilesListComponent);
