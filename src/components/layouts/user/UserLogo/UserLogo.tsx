import React from "react";
import styles from "./UserLogo.module.scss";
import { User } from "../../../../interfaces/user";

interface UserLogoProps {
  user: User | null;
}

export const UserLogo: React.FC<UserLogoProps> = ({ user }) => {
  return (
    <div className={styles.logo}>
      <h3>{user?.login && user.login.charAt(0)}</h3>
    </div>
  );
};
