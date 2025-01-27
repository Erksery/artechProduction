import styles from "./Home.module.scss";
import { Header } from "../../components/layouts/header/panel/Header";
import { SideMenu } from "../../components/layouts/sideMenu/SideMenu";
import { useModal } from "../../hooks/useModal.tsx";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts";
import { useGetFolders } from "../../hooks/useGetFolders.ts";

export const Home = () => {
  const files = useSelector((state: RootState) => state.files.files);
  const { activeModal } = useModal();

  useGetFolders();

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
