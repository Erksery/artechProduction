import { ReactNode, useRef } from "react";
import styles from "./Modal.module.scss";
import { useBlockScroll } from "../../../hooks/useBlockScroll";
import { useModal } from "../../../hooks/useModal";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { BackgroundModal } from "./BackgroundModal/BackgroundModal";

interface ModalProps {
  children: ReactNode;
  className?: string | undefined;
}

export const Modal: React.FC<ModalProps> = ({ children, className }) => {
  const { closeModal } = useModal();
  const modalRef = useRef(null);

  useBlockScroll(true);
  useClickOutside(modalRef, closeModal);

  return (
    <BackgroundModal>
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.25 }}
        className={`${styles.modalContainer} ${className}`}
        layout
      >
        <div className={styles.modalHeader}>
          <motion.button onClick={closeModal}>
            <CgClose />
          </motion.button>
        </div>
        {children}
      </motion.div>
    </BackgroundModal>
  );
};
