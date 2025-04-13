import styles from "./FolderViewer.module.scss";
import { useSelector } from "react-redux";
import { FilesList } from "../../file/filesList/FilesList";
import { RootState } from "../../../../store";
import { useMemo } from "react";
import { FolderListGrid } from "../folderList/grid/FolderListGrid";
import { FileCategories } from "../../file/fileCategories/FileCategories";

interface Props {
  folderId: string | undefined;
}

export const FolderViewer = ({ folderId }: Props) => {
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
        <h3>Папки {subFolders.length}</h3>
        <FolderListGrid subFolders={subFolders} />
      </div>
      <div className={styles.list}>
        <h3>Файлы {`${files.length}`}</h3>
        <div>
          <FileCategories />
        </div>
        <FilesList files={files} cardSize={200} />
      </div>
    </div>
  );
};
