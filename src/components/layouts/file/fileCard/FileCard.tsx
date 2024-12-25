import React from "react";
import styles from "./FileCard.module.scss";
import { FileImage } from "../fileImage/FileImage";

interface FileCardProps {
  i: number;
}

export const FileCard: React.FC<FileCardProps> = ({ i }) => {
  return (
    <div className={styles.card}>
      <FileImage src={""} />
      {i}
    </div>
  );
};
