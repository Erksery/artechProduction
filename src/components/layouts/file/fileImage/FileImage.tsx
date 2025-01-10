import React from "react";
import styles from "./FileImage.module.scss";

interface FileImageProps {
  src: string;
}

export const FileImage: React.FC<FileImageProps> = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${src})` }}
      />
      <img
        loading="lazy"
        src={src}
        alt="image"
        draggable="false"
        className={styles.mainImage}
      />
    </div>
  );
};
