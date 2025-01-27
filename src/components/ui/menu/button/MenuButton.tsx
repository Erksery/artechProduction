import React, { ReactNode } from "react";
import styles from "./MenuButton.module.scss";
import { motion } from "framer-motion";

interface MenuButtonProps {
  event: (e: { preventDefault: () => any }) => void;
  icon: ReactNode;
  title: string;
  description?: string;
  height?: number;
  red?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  event,
  icon,
  title,
  description,
  height = 40,
  red = false,
}) => {
  return (
    <motion.button
      onClick={event}
      whileHover={{
        scale: 0.9,
      }}
      whileTap={{
        scale: 0.85,
      }}
      className={`${styles.buttonContainer} ${red && styles.red}`}
      style={{ height: height }}
    >
      {icon}
      <div className={styles.info}>
        <p>{title}</p>
        {description && <label>{description}</label>}
      </div>
    </motion.button>
  );
};
