import styles from "./Status.module.scss";

interface Props {
  text: string | undefined;
  color?: "red" | "green" | undefined;
}

export const Status = ({ text, color }: Props) => {
  return (
    <div className={`${styles.container} ${color && styles[color]}`}>
      <p>{text}</p>
    </div>
  );
};
