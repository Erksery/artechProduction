import React, { ReactNode } from "react";
import styles from "./MenuButton.module.scss";
import { motion } from "framer-motion";

interface MenuButtonProps {
  event: () => void;
  icon: ReactNode;
  title: string;
  description?: string;
  height?: number;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  event,
  icon,
  title,
  description,
  height = 60,
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
      className={styles.buttonContainer}
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
