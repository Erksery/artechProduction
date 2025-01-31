import React from "react";
import styles from "./SuccessModal.module.scss";
import { Modal } from "../../modal/Modal";
import { motion } from "framer-motion";

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
    <Modal>
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>{description}</p>
        <motion.button
          onClick={event}
          whileHover={{
            scale: 0.95,
          }}
          whileTap={{
            scale: 0.9,
          }}
          style={{ backgroundColor: button.color }}
        >
          {button.text}
        </motion.button>
      </div>
    </Modal>
  );
};
