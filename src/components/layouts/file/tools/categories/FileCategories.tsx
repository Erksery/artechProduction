import styles from "./FileCategories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../../../store/slices/files";
import { AppDispatch, RootState } from "../../../../../store";
import { fileCategories, FileCategoriesTypes } from "./Categories";

import { SortType } from "../sorting/SortMethods";
import { FileSorting } from "../sorting/FileSorting";

interface Props {
  isMobile: boolean;
  activeSort: SortType | undefined;
  handleSorting: (sortMethod?: string) => void;
  openSortMenu: boolean;
  setOpenSortMenu: (openSortMenu: boolean) => void;
}

export const FileCategories = ({
  isMobile,
  activeSort,
  handleSorting,
  openSortMenu,
  setOpenSortMenu,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const file = useSelector((state: RootState) => state.files);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        {fileCategories.map((type: FileCategoriesTypes) => (
          <button
            key={type.id}
            onClick={() =>
              dispatch(setFilter({ name: "mimeType", value: type.value }))
            }
            className={`${styles.category} ${
              type.value === file.filter.value && styles.active
            }`}
          >
            {type.icon}
            <p>{type.title}</p>
          </button>
        ))}
      </div>
      {!isMobile && (
        <div className={styles.sortContainer}>
          <FileSorting
            activeSort={activeSort}
            handleSorting={handleSorting}
            openSortMenu={openSortMenu}
            setOpenSortMenu={setOpenSortMenu}
          />
        </div>
      )}
    </div>
  );
};
