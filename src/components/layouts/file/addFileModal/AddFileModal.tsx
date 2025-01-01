import React from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFileModal.module.scss";
import { Upload } from "../upload/Upload";
import { AddFileCard } from "./fileCard/AddFileCard";

interface AddFileModal {
  closeModal: () => void;
}

export const AddFileModal: React.FC<AddFileModal> = ({ closeModal }) => {
  return (
    <Modal>
      <div className={styles.fileAddContainer}>
        <div className={styles.upload}>
          <Upload />
        </div>
        <div className={styles.filesList}>
          {Array(30)
            .fill(null)
            .map((_, index) => (
              <AddFileCard key={index} />
            ))}
        </div>
        <div className={styles.buttonsContainer}>
          <button>Отменить</button>
          <button>Подтвердить</button>
        </div>
      </div>
    </Modal>
  );
};
