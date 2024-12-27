import React from "react";
import styles from "./FileCard.module.scss";
import { FileImage } from "../fileImage/FileImage";
import { PiImagesSquare } from "react-icons/pi";

interface FileCardProps {
  i: number;
}

export const FileCard: React.FC<FileCardProps> = ({ i }) => {
  return (
    <div className={styles.card}>
      <FileImage src={""} />
      <div className={styles.info}>
        <p className={styles.type}>
          <PiImagesSquare className={styles.icon} />
          image/jpeg
        </p>
        <p className={styles.name}>{i} fdfsdfsdgdsgd</p>
      </div>
    </div>
  );
};
