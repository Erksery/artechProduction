import styles from "./AddFileCard.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFileCode } from "react-icons/fa";
import React from "react";

interface AddFileCardProps {
  file: File;
  onDelete: (fileName: string) => void;
}

export const AddFileCard: React.FC<AddFileCardProps> = ({ file, onDelete }) => {
  const formatFileSize = (size: number): string => {
    const units = ["B", "KB", "MB", "GB"];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }
    return `${size.toFixed(2)} ${units[index]}`;
  };

  return (
    <div className={styles.fileCard}>
      <div className={styles.icon}>
        <FaRegFileCode />
      </div>
      <div className={styles.info}>
        <p>{file.name}</p>
        <label>{formatFileSize(file.size)}</label>
        <label>{file.type}</label>
      </div>
      <div className={styles.delete}>
        <button onClick={() => onDelete(file.name)}>
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
};
