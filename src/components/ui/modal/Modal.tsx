import { ReactNode, useRef } from "react";
import styles from "./Modal.module.scss";
import { useBlockScroll } from "../../../hooks/useBlockScroll";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { BackgroundModal } from "./BackgroundModal/BackgroundModal";
import { useModal } from "@hooks/modal/useModal";

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
      <div ref={modalRef} className={`${styles.modalContainer} ${className}`}>
        <div className={styles.modalHeader}>
          <motion.button onClick={closeModal}>
            <CgClose />
          </motion.button>
        </div>
        {children}
      </div>
    </BackgroundModal>
  );
};
