import styles from "./Folder.module.scss";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { Header } from "../../components/layouts/header/panel/Header";
import { SideMenu } from "../../components/layouts/sideMenu/SideMenu";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import { useGetFiles } from "../../hooks/useGetFiles.ts";
import { useActiveFolder } from "../../hooks/useActiveFolder.ts";
import { FolderViewer } from "../../components/layouts/folder/viewer/FolderViewer.tsx";

export const Folder: React.FC = () => {
  const { id } = useParams();
  const { activeModal } = useModal();

  useGetFiles(id);
  useActiveFolder(id);

  return (
    <>
      <AnimatePresence>{activeModal}</AnimatePresence>
      <div className={styles.folderContainer}>
        <SideMenu />

        <div className={styles.contentContainer}>
          <ErrorBoundary>
            <Header />
            <FolderViewer folderId={id} />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
