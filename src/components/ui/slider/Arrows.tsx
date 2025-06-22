import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

import styles from './Slider.module.scss'

interface Props {
  changeSlide: (direction: number) => void
}

export const Arrows = ({ changeSlide }: Props) => {
  return (
    <div className={styles.arrows}>
      <button onClick={() => changeSlide(-1)}>
        <FaChevronLeft />
      </button>
      <button onClick={() => changeSlide(1)}>
        <FaChevronRight />
      </button>
    </div>
  )
}
