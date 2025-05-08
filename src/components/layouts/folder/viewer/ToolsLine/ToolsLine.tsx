import { FileCategories } from "@components/layouts/file/tools/categories/FileCategories";
import styles from "./ToolsLine.module.scss";
import { useMobileView } from "@hooks/useMobileView";

import { BiEditAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import { sortMethods } from "@components/layouts/file/tools/sorting/SortMethods";
import { setOrder, toggleEditMode } from "@store/slices/files";
import { FileSorting } from "@components/layouts/file/tools/sorting/FileSorting";

export const ToolsLine = () => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const fileSelector = useSelector((state: RootState) => state.files);
  const { isMobile } = useMobileView();

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
    <>
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
    </>
  );
};
