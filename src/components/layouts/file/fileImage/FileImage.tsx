import React from "react";
import styles from "./FileImage.module.scss";

interface FileImageProps {
  src: string;
}

export const FileImage: React.FC<FileImageProps> = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <img alt="Image" />
    </div>
  );
};
