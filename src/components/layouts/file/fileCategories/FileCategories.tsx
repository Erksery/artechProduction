import styles from "./FileCategories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../../store/slices/files";
import { AppDispatch, RootState } from "../../../../store";
import { fileCategories, FileCategoriesTypes } from "./Categories";

export const FileCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeFilter = useSelector((state: RootState) => state.files.filter);

  return (
    <div className={styles.container}>
      {fileCategories.map((type: FileCategoriesTypes) => (
        <button
          key={type.id}
          onClick={() =>
            dispatch(setFilter({ name: "mimeType", value: type.value }))
          }
          className={`${styles.category} ${
            type.value === activeFilter.value && styles.active
          }`}
        >
          {type.icon}
          <p>{type.title}</p>
        </button>
      ))}
    </div>
  );
};
