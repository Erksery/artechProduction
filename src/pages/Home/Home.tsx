import React from "react";
import styles from "./Home.module.scss";
import { Header } from "../../components/layouts/header/Header";
import { SideMenu } from "../../components/layouts/sideMenu/SideMenu";

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <SideMenu />

      <div className={styles.contentContainer}>
        <Header />
        Home
      </div>
    </div>
  );
};
