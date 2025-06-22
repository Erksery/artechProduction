import { ReactNode, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@store/index'
import { setActiveFile } from '@store/slices/files'

import { Arrows } from './Arrows'
import styles from './Slider.module.scss'

interface Props {
  children: (currentFile: number) => ReactNode
  itemsLength: number
}
export const Slider = ({ children, itemsLength }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const activeFile = useSelector((state: RootState) => state.files.activeFile)
  const [openFile, setOpenFile] = useState(+activeFile)

  const changeSlide = (direction = 1) => {
    let slideNumber = 0

    if (openFile + direction < 0) {
      slideNumber = itemsLength - 1
    } else {
      slideNumber = (openFile + direction) % itemsLength
    }

    setOpenFile(slideNumber)
    dispatch(setActiveFile(slideNumber))
  }
  return (
    <div className={styles.slider}>
      {children(openFile)}
      <Arrows changeSlide={changeSlide} />
    </div>
  )
}
