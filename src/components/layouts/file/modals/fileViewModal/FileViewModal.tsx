import React from "react";
import styles from "./FileViewModal.module.scss";
import { Modal } from "../../../../ui/modal/Modal";

interface FileViewModalProps {
  file: number;
}

export const FileViewModal: React.FC<FileViewModalProps> = ({ file }) => {
  return (
    <Modal>
      <div className={styles.fileView}>
        <button className={styles.but}>-</button>
        <div className={styles.viewer}>{file}</div>
        <button className={styles.but}>+</button>
      </div>
    </Modal>
  );
};
