import React, { useState } from "react";
import styles from "./FileImage.module.scss";
import config from "../../../../../config";

interface FileImageProps {
  src: string;
  folderId?: string;
  height?: string;
  bgColor?: string;
  compress?: boolean;
  className?: string;
}

const FileImage: React.FC<FileImageProps> = ({
  src,
  height = "160px",
  // compress = true,
  folderId,
  className,
}) => {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);

  const fullImageURL = `${config.apiUrl}/files/compress_image/folder/${folderId}/file/${src}.webp`;

  return (
    <div className={`${styles.imageContainer}`} style={{ height }}>
      <img
        loading="lazy"
        src={fullImageURL}
        alt="image"
        draggable="false"
        className={`${isFullImageLoaded ? styles.visible : ""} ${className}`}
        onLoad={() => setIsFullImageLoaded(true)}
      />
    </div>
  );
};

export default FileImage;
