import React from "react";
import styles from "./SuccessModal.module.scss";
import { Modal } from "../../modal/Modal";

interface SuccessModalProps {
  title: string;
  description: string;
  button: { text: string; color: string };
  event: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  description,
  button,
  event,
}) => {
  return (
    <Modal className={styles.modal}>
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={event}>{button.text}</button>
      </div>
    </Modal>
  );
};
