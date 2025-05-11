import styles from "./Home.module.scss";

import { Header } from "../../components/layouts/header/panel/Header";

import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";

import { ContentPage } from "../../components/ui/contentPage/ContentPage.tsx";
import { SideMenu } from "../../components/layouts/menu/side/SideMenu.tsx";

export const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <SideMenu />

        <div className={styles.contentContainer}>
          <ErrorBoundary>
            <Header />
            <ContentPage className={styles.content}>
              Откройте папку для просмотра содержимого
            </ContentPage>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
