import styles from "./SubmitButton.module.scss";
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string | undefined;
  event?: () => void;
  type?: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  text,
  className,
  type,
  disabled,
  event,
  ...props
}: Props) => {
  return (
    <motion.button
      onClick={event}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      whileHover={{
        scale: 0.95,
      }}
      whileTap={{
        scale: 0.9,
      }}
      {...props}
    >
      {text}
    </motion.button>
  );
};
