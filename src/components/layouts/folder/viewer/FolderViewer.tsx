import { useMemo } from "react";
import styles from "./FolderViewer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FilesList } from "../../file/list/FilesList";
import { AppDispatch, RootState } from "../../../../store";
import { FolderListGrid } from "../list/grid/FolderListGrid";
import { FileCategories } from "../../file/tools/categories/FileCategories";
import { toggleEditMode } from "../../../../store/slices/files";

import { BiEditAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

interface Props {
  folderId: string | undefined;
  loading: boolean;
}

export const FolderViewer = ({ folderId, loading }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const fileSelector = useSelector((state: RootState) => state.files);
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
        <div className={styles.tools}>
          <FileCategories />
          <button
            onClick={() => dispatch(toggleEditMode())}
            className={styles.editButton}
          >
            {fileSelector.activeEditMode ? (
              <CgClose fill=" #f08e7e;" />
            ) : (
              <BiEditAlt />
            )}
          </button>
        </div>
        <FilesList files={fileSelector.files} loading={loading} />
      </div>
    </div>
  );
};
