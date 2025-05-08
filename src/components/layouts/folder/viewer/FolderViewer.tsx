import styles from "./FolderViewer.module.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { FilesList } from "../../file/list/FilesList";
import { FolderListGrid } from "../list/grid/FolderListGrid";
import { ToolsLine } from "./ToolsLine/ToolsLine";

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

  console.log("rerender view");

  return (
    <div className={styles.viewer}>
      <div className={styles.list}>
        <FolderListGrid subFolders={subFolders} />
      </div>
      <div className={styles.list}>
        <ToolsLine />

        <FilesList files={files} loading={loading} />
      </div>
    </div>
  );
};
