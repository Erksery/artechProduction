import styles from "./FolderViewer.module.scss";
import { useSelector } from "react-redux";
import { FilesList } from "../../file/list/FilesList";
import { RootState } from "../../../../store";
import { useMemo } from "react";
import { FolderListGrid } from "../list/grid/FolderListGrid";
import { FileCategories } from "../../file/tools/categories/FileCategories";

interface Props {
  folderId: string | undefined;
  loading: boolean;
}

export const FolderViewer = ({ folderId, loading }: Props) => {
  const files = useSelector((state: RootState) => state.files.files);
  const sliceFolder = useSelector((state: RootState) => state.folders);

  const subFolders = useMemo(
    () =>
      sliceFolder.folders.filter(
        (subFolder) => subFolder.inFolder === folderId
      ),
    [sliceFolder.folders, folderId]
  );
  return (
    <div className={styles.viewer}>
      <div className={styles.list}>
        <FolderListGrid subFolders={subFolders} />
      </div>
      <div className={styles.list}>
        <div>
          <FileCategories />
        </div>
        <FilesList files={files} loading={loading} />
      </div>
    </div>
  );
};
