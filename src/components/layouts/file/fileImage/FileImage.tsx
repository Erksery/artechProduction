import React, { useState } from "react";
import styles from "./FileImage.module.scss";
import config from "../../../../../config";

interface FileImageProps {
  src: string;
  folderId?: string;
  height?: string;
  bgColor?: string;
  compress?: boolean;
}

export const FileImage: React.FC<FileImageProps> = ({
  src,
  height = "160px",
  compress = true,
  folderId,
}) => {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);

  const fullImageURL = `${config.apiUrl}/files/image/folder/${folderId}/file/${src}`;

  return (
    <div style={{ minHeight: height }} className={styles.imageContainer}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${fullImageURL})` }}
      />
      <img
        loading="lazy"
        src={fullImageURL}
        alt="image"
        draggable="false"
        className={styles.mainImage}
        onLoad={() => !compress && setIsFullImageLoaded(true)}
      />
    </div>
  );
};
