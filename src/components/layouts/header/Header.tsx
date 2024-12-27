import React from "react";
import styles from "./Header.module.scss";
import { RiAddLine } from "react-icons/ri";
import { UserLogo } from "../user/UserLogo/UserLogo";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.tools}>
        <button>
          <RiAddLine />
        </button>
      </div>
      <div className={styles.user}>
        <UserLogo />
      </div>
    </div>
  );
};
