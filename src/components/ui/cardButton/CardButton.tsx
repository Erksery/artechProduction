import { ReactNode } from "react";
import styles from "./CardButton.module.scss";

interface CardButtonProps {
  title: string;
  description: string;
  icon: ReactNode;
  active: boolean;
  status: string;
  onActive: (status: string) => void;
}

export const CardButton: React.FC<CardButtonProps> = ({
  title,
  description,
  icon,
  active = true,
  status,
  onActive,
}) => {
  return (
    <button
      onClick={() => onActive(status)}
      className={`${styles.cardButton} ${active ? styles.active : ""}`}
    >
      {icon}
      <div className={styles.info}>
        <p>{title}</p>
        <label>{description}</label>
      </div>
    </button>
  );
};
