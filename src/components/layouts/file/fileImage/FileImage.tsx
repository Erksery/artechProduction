import React, { useState } from "react";
import styles from "./FileImage.module.scss";
import config from "../../../../../config";

interface FileImageProps {
  src: string;
  height?: string;
  bgColor?: string;
  compress?: boolean;
}

export const FileImage: React.FC<FileImageProps> = ({
  src,
  height = "160px",
  compress = true,
}) => {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);

  const compressedImageURL = `${config.apiUrl}/compressedImage/${src}`;
  const fullImageURL = `${config.apiUrl}/image/${src}`;

  return (
    <div style={{ minHeight: height }} className={styles.imageContainer}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${compressedImageURL})` }}
      />
      <img
        loading="lazy"
        src={
          compress
            ? compressedImageURL
            : isFullImageLoaded
            ? fullImageURL
            : compressedImageURL
        }
        alt="image"
        draggable="false"
        className={styles.mainImage}
        onLoad={() => !compress && setIsFullImageLoaded(true)}
      />
    </div>
  );
};
