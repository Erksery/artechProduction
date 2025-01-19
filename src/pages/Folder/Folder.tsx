import styles from "./Folder.module.scss";
import { Header } from "../../components/layouts/header/panel/Header";
import { SideMenu } from "../../components/layouts/sideMenu/SideMenu";
import { FilesList } from "../../components/layouts/file/filesList/FilesList";
import { useModal } from "../../hooks/useModal.tsx";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";
import { useGetFiles } from "../../hooks/useGetFiles.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index.ts";
import { useGetFolders } from "../../hooks/useGetFolders.ts";
import { useParams } from "react-router-dom";
import { useActiveFolder } from "../../hooks/useActiveFolder.ts";

export const Folder: React.FC = () => {
  const { id } = useParams();
  const { activeModal } = useModal();
  const files = useSelector((state: RootState) => state.files.files);

  useGetFolders();
  useGetFiles({ id: id });
  useActiveFolder(id);

  return (
    <>
      <AnimatePresence>{activeModal}</AnimatePresence>
      <div className={styles.folderContainer}>
        <SideMenu />

        <div className={styles.contentContainer}>
          <ErrorBoundary>
            <Header />
            <FilesList files={files} cardSize={200} />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
