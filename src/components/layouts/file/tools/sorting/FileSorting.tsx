import { GoChevronDown } from 'react-icons/go'
import { TbArrowsSort } from 'react-icons/tb'

import { MenuContainer } from '../../../../ui/menu/container/MenuContainer'
import { SortCard } from './card/SortCard'
import styles from './FileSorting.module.scss'
import { SortType } from './SortMethods'

export interface CardProps {
  activeSort: SortType | undefined
  handleSorting: (sortMethod?: string) => void
}

interface Props extends CardProps {
  openSortMenu: boolean
  setOpenSortMenu: (openSortMenu: boolean) => void
}

const FileSorting = ({
  activeSort,
  handleSorting,
  openSortMenu,
  setOpenSortMenu
}: Props) => {
  return (
    <div className={styles.container}>
      <MenuContainer
        element={
          <SortCard
            activeSort={activeSort}
            handleSorting={handleSorting}
          />
        }
        open={openSortMenu}
        setOpen={setOpenSortMenu}>
        <button className={styles.sortButton}>
          <p>Сортировка {activeSort?.menuTitle}</p>
          <div
            style={{ transform: `rotate(${openSortMenu ? 180 : 0}deg)` }}
            className={styles.iconContainer}>
            <GoChevronDown />
          </div>
        </button>
      </MenuContainer>

      <button
        onClick={() => handleSorting()}
        className={styles.order}>
        <TbArrowsSort />
      </button>
    </div>
  )
}

export default FileSorting
