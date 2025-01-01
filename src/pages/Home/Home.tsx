import styles from "./Home.module.scss";
import { Header } from "../../components/layouts/header/panel/Header";
import { SideMenu } from "../../components/layouts/sideMenu/SideMenu";
import { FilesList } from "../../components/layouts/file/filesList/FilesList";
import { useModal } from "../../hooks/useModal.tsx";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";

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
            <FilesList />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
