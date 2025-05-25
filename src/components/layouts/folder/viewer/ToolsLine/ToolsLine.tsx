import styles from "./ToolsLine.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import { sortMethods } from "@components/layouts/file/tools/sorting/SortMethods";
import { setOrder, toggleEditMode } from "@store/slices/files";
import { ToolsViewer } from "./ToolsViewer";

const FileSorting = React.lazy(
  () => import("@components/layouts/file/tools/sorting/FileSorting")
);

export const ToolsLine = () => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const fileOrderName = useSelector(
    (state: RootState) => state.files.order.name
  );
  const activeEditMode = useSelector(
    (state: RootState) => state.files.activeEditMode
  );

  const activeSort = useMemo(
    () => sortMethods.find((method) => method.sortName === fileOrderName),
    [fileOrderName]
  );

  const handleSorting = useCallback((sortMethod?: string): void => {
    dispatch(setOrder(sortMethod));
    setOpenSortMenu(false);
  }, []);

  return (
    <>
      <div className={styles.tools}>
        <ToolsViewer editMode={activeEditMode} />
        <button
          onClick={() => dispatch(toggleEditMode())}
          className={`${styles.editButton} ${activeEditMode && styles.active}`}
        >
          {activeEditMode ? <CgClose /> : <BiEditAlt />}
        </button>
      </div>

      <div className={styles.sortCont}>
        <FileSorting
          activeSort={activeSort}
          handleSorting={handleSorting}
          openSortMenu={openSortMenu}
          setOpenSortMenu={setOpenSortMenu}
        />
      </div>
    </>
  );
};
