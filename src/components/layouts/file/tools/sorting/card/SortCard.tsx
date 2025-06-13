import { CardProps } from '../FileSorting'
import styles from '../FileSorting.module.scss'
import { sortMethods } from '../SortMethods'

export const SortCard = ({ activeSort, handleSorting }: CardProps) => {
  return (
    <div className={styles.sortContainer}>
      {sortMethods.map(method => (
        <button
          key={method.id}
          onClick={() => handleSorting(method.sortName)}
          className={`${styles.menuButton} ${
            activeSort?.sortName === method.sortName ? styles.active : ''
          }`}>
          {method.title}
        </button>
      ))}
    </div>
  )
}
