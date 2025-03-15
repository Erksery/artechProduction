import { ReactNode } from "react";
import styles from "./ContentPage.module.scss";

interface Props {
  children: ReactNode;
  className: string;
}

export const ContentPage = ({ children, className }: Props) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
