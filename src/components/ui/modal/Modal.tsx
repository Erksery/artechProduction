import { ReactNode, useRef } from "react";
import styles from "./Modal.module.scss";
import { useBlockScroll } from "../../../hooks/useBlockScroll";
import { useModal } from "../../../hooks/useModal";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { motion } from "framer-motion";

interface ModalProps {
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const { closeModal } = useModal();
  const modalRef = useRef(null);

  useBlockScroll(true);
  useClickOutside(modalRef, closeModal);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.bg}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: "70%" }}
        animate={{ scale: "100%" }}
        exit={{ scale: "70%" }}
        className={styles.modalContainer}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
