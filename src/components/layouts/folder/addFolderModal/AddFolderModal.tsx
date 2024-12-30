import React from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFolderModal.module.scss";

interface AddFolderModal {
  closeModal: () => void;
}

export const AddFolderModal: React.FC<AddFolderModal> = ({ closeModal }) => {
  return (
    <Modal>
      <div className={styles.modalHeader}>
        <button onClick={closeModal}>Close</button>
      </div>
      <div>folder</div>
    </Modal>
  );
};
