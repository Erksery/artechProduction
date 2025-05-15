import styles from "./Folder.module.scss";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "../../components/ui/error/ErrorBoundary.tsx";

import { useGetFiles } from "../../hooks/useGetFiles.ts";
import { FolderViewer } from "../../components/layouts/folder/viewer/FolderViewer.tsx";
import { useActiveFolder } from "../../hooks/useActiveFolder.ts";

export const PublicFolder = () => {
  const { id } = useParams();

  const { fileLoading } = useGetFiles(id, "public");
  useActiveFolder(id);

  return (
    <>
      <ErrorBoundary>
        <div className={styles.folderContainer}>
          <div className={styles.contentContainer}>
            <FolderViewer folderId={id} loading={fileLoading} />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};
