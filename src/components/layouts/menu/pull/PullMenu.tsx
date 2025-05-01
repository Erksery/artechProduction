import styles from "./PullMenu.module.scss";
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useBlockScroll } from "../../../../hooks/useBlockScroll";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useModal } from "../../../../hooks/useModal";
import { BackgroundModal } from "../../../ui/modal/BackgroundModal/BackgroundModal";

interface Props {
  children?: ReactNode;
}

export const PullMenu = ({ children }: Props) => {
  const { closeModal } = useModal();
  const menuRef = useRef<HTMLDivElement>(null);

  useBlockScroll(true);
  useClickOutside(menuRef, closeModal);

  return (
    <BackgroundModal className={styles.background}>
      <motion.div
        ref={menuRef}
        className={styles.container}
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </BackgroundModal>
  );
};
