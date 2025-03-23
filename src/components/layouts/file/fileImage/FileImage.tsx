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
      <svg aria-hidden="true" className={styles.svgFilter}>
        <filter
          id="shadow"
          x="-100%"
          y="-100%"
          width="1000px"
          height="300px"
          colorInterpolationFilters="sRGB"
          primitiveUnits="objectBoundingBox"
        >
          <feGaussianBlur stdDeviation="0.1" result="blur" />
          <feOffset in="blur" dx="0" dy="-0.2" result="topBlur" />
          <feOffset in="blur" dx="0" dy="0.2" result="bottomBlur" />

          <feMerge>
            <feMergeNode in="topBlur" />
            <feMergeNode in="bottomBlur" />
          </feMerge>

          <feDisplacementMap in="in" scale="0.1" yChannelSelector="R" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" />
        </filter>
      </svg>
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
