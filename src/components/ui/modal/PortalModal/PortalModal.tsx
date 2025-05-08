import styles from "./PortalModal.module.scss";
import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { BackgroundModal } from "../BackgroundModal/BackgroundModal";
import { useBlockScroll } from "../../../../hooks/useBlockScroll";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../../../../hooks/useModal";

interface Props {
  children?: ReactNode;
  className?: string;
}

const modalRoot = document.getElementById("modal-root")!;

export const PortalModal = ({ children, className }: Props) => {
  const modalRef = useRef(null);

  const { closeModal } = useModal();

  useBlockScroll(true);
  useClickOutside(modalRef, closeModal);

  return createPortal(
    <AnimatePresence>
      <BackgroundModal>
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className={styles.modal}
        >
          <button onClick={closeModal}>Закрыть</button>
          <div className={`${styles.container} ${className}`}>{children}</div>
        </motion.div>
      </BackgroundModal>
    </AnimatePresence>,
    modalRoot
  );
};
