import React from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFileModal.module.scss";

interface AddFileModal {
  closeModal: () => void;
}

export const AddFileModal: React.FC<AddFileModal> = ({ closeModal }) => {
  return (
    <Modal>
      <div className={styles.modalHeader}>
        <button onClick={closeModal}>Close</button>
      </div>
      <div>sadsaffs</div>
    </Modal>
  );
};
