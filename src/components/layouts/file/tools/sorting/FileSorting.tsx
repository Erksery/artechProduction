import styles from "./FileSorting.module.scss";
import { sortMethods, SortType } from "./SortMethods";

interface Props {
  activeSort: SortType | undefined;
  handleSorting: (sortMethod: string) => void;
}

export const FileSorting = ({ activeSort, handleSorting }: Props) => {
  return (
    <div className={styles.sortContainer}>
      {sortMethods.map((method) => (
        <button
          onClick={() => handleSorting(method.sortName)}
          className={`${
            activeSort?.sortName === method.sortName ? styles.active : ""
          }`}
        >
          {method.title}
        </button>
      ))}
    </div>
  );
};
