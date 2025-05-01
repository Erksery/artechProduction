import { useCallback, useMemo, useState } from "react";
import styles from "./FolderViewer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FilesList } from "../../file/list/FilesList";
import { AppDispatch, RootState } from "../../../../store";
import { FolderListGrid } from "../list/grid/FolderListGrid";
import { FileCategories } from "../../file/tools/categories/FileCategories";
import { setOrder, toggleEditMode } from "../../../../store/slices/files";

import { BiEditAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { sortMethods } from "../../file/tools/sorting/SortMethods";
import { FileSorting } from "../../file/tools/sorting/FileSorting";
import { useMobileView } from "../../../../hooks/useMobileView";

interface Props {
  folderId: string | undefined;
  loading: boolean;
}

export const FolderViewer = ({ folderId, loading }: Props) => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const fileSelector = useSelector((state: RootState) => state.files);
  const sliceFolder = useSelector((state: RootState) => state.folders);

  const { isMobile } = useMobileView();

  const subFolders = useMemo(
    () =>
      sliceFolder.folders.filter(
        (subFolder) => subFolder.inFolder === folderId
      ),
    [sliceFolder.folders, folderId]
  );

  const activeSort = useMemo(
    () =>
      sortMethods.find((method) => method.sortName === fileSelector.order.name),
    [fileSelector.order.name]
  );

  const handleSorting = useCallback((sortMethod?: string): void => {
    dispatch(setOrder(sortMethod));
    setOpenSortMenu(false);
  }, []);

  return (
    <div className={styles.viewer}>
      <div className={styles.list}>
        <FolderListGrid subFolders={subFolders} />
      </div>
      <div className={styles.list}>
        <div className={styles.tools}>
          <FileCategories
            isMobile={isMobile}
            activeSort={activeSort}
            handleSorting={handleSorting}
            openSortMenu={openSortMenu}
            setOpenSortMenu={setOpenSortMenu}
          />
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
        {isMobile && (
          <div className={styles.sortCont}>
            <FileSorting
              activeSort={activeSort}
              handleSorting={handleSorting}
              openSortMenu={openSortMenu}
              setOpenSortMenu={setOpenSortMenu}
            />
          </div>
        )}

        <FilesList files={fileSelector.files} loading={loading} />
      </div>
    </div>
  );
};
