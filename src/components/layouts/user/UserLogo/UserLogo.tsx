import React from "react";
import styles from "./UserLogo.module.scss";
import { UserData } from "../../../../interfaces/user";

interface UserLogoProps {
  userData: UserData | null;
}

export const UserLogo: React.FC<UserLogoProps> = ({ userData }) => {
  return (
    <div className={styles.logo}>
      {userData?.login && userData.login.charAt(0)}
    </div>
  );
};
