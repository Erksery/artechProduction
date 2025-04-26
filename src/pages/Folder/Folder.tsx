import styles from "./Folder.module.scss";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { Header } from "../../components/layouts/header/panel/Header";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";
import { useModal } from "../../hooks/useModal.tsx";
import { useGetFiles } from "../../hooks/useGetFiles.ts";
import { useActiveFolder } from "../../hooks/useActiveFolder.ts";
import { FolderViewer } from "../../components/layouts/folder/viewer/FolderViewer.tsx";
import { SideMenu } from "../../components/layouts/menu/side/SideMenu.tsx";

export const Folder: React.FC = () => {
  const { id } = useParams();
  const { activeModal } = useModal();

  const { fileLoading } = useGetFiles(id);
  useActiveFolder(id);

  return (
    <>
      <ErrorBoundary>
        <AnimatePresence>{activeModal && activeModal}</AnimatePresence>
        <div className={styles.folderContainer}>
          <SideMenu />

          <div className={styles.contentContainer}>
            <Header />
            <FolderViewer folderId={id} loading={fileLoading} />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};
