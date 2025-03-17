import styles from "./Home.module.scss";
import { AnimatePresence } from "framer-motion";
import { Header } from "../../components/layouts/header/panel/Header";
import { SideMenu } from "../../components/layouts/sideMenu/SideMenu";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";
import { useModal } from "../../hooks/useModal.tsx";

export const Home = () => {
  const { activeModal } = useModal();

  return (
    <>
      <AnimatePresence>{activeModal}</AnimatePresence>
      <div className={styles.homeContainer}>
        <SideMenu />

        <div className={styles.contentContainer}>
          <ErrorBoundary>
            <Header />
            Home
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
