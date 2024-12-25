import React from "react";
import styles from "./FilesList.module.scss";
import { FileCard } from "../fileCard/FileCard";

export const FilesList = () => {
  return (
    <div className={styles.table}>
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <FileCard i={index} />
        ))}
    </div>
  );
};
