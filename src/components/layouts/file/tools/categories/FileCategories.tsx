import styles from "./FileCategories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setOrder } from "../../../../../store/slices/files";
import { AppDispatch, RootState } from "../../../../../store";
import { fileCategories, FileCategoriesTypes } from "./Categories";

import { TbArrowsSort } from "react-icons/tb";
import { GoChevronDown } from "react-icons/go";
import { MenuContainer } from "../../../../ui/menu/MenuContainer";
import { useState } from "react";
import { FileSorting } from "../sorting/FileSorting";
import { sortMethods } from "../sorting/SortMethods";

export const FileCategories = () => {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const file = useSelector((state: RootState) => state.files);

  const handleSorting = (sortMethod?: string): void => {
    dispatch(setOrder(sortMethod));
  };

  const activeSort = sortMethods.find(
    (method) => method.sortName === file.order.name
  );

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

      <div className={styles.sortContainer}>
        <MenuContainer
          element={
            <FileSorting
              activeSort={activeSort}
              handleSorting={handleSorting}
            />
          }
          open={openSortMenu}
          setOpen={setOpenSortMenu}
        >
          <button>
            <p>Сортировка {activeSort?.menuTitle}</p>
            <div
              style={{ transform: `rotate(${openSortMenu ? 180 : 0}deg)` }}
              className={styles.iconContainer}
            >
              <GoChevronDown />
            </div>
          </button>
        </MenuContainer>

        <button onClick={() => handleSorting()}>
          <TbArrowsSort />
        </button>
      </div>
    </div>
  );
};
