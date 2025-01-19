import React from "react";
import styles from "./Switch.module.scss";
import { motion } from "framer-motion";

interface SwitchProps {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ isChecked, setIsChecked }) => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div
      className={`${styles.switch}  ${isChecked && styles.active}`}
      onClick={handleToggle}
    >
      <motion.div
        className={styles.switchKnob}
        animate={{ x: isChecked ? 20 : 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          bounce: 0.1,
        }}
      />
    </div>
  );
};
