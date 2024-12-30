import { useRef, ReactNode } from "react";
import styles from "./MenuContainer.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useCloseScroll } from "../../../hooks/useCloseScroll";

interface MenuContainerProps {
  children: ReactNode;
  element: ReactNode;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
  children,
  element,
  open,
  setOpen,
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  const close = () => setOpen(false);

  useCloseScroll(open, setOpen);

  useClickOutside(menuRef, close);

  return (
    <div ref={menuRef} className={styles.menuContainer}>
      <div onClick={toggleMenu}>{children}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className={styles.menu}
          >
            {element}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
