import React from "react";
import styles from "./FileImage.module.scss";
import image from "../../../../assets/14124125555125125155.jpg";

interface FileImageProps {
  src: string;
}

export const FileImage: React.FC<FileImageProps> = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${image})` }}
      />
      <img className={styles.mainImage} src={image} alt="Image" />
    </div>
  );
};
