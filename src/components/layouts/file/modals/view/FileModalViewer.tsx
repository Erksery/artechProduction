import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { Slider } from '@components/ui/slider/Slider'

import styles from './FileViewModal.module.scss'
import { RenderFileContent } from './RenderFileContent'

interface Props {
  activeFolder: string | undefined
}

export const FileModalViewer = ({ activeFolder }: Props) => {
  const files = useSelector((state: RootState) => state.files.files)

  return (
    <div className={styles.sliderWrapper}>
      <Slider itemsLength={files.length}>
        {currentFile => (
          <motion.div
            className={styles.slideList}
            animate={{ x: `-${currentFile * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}>
            {files.map((_, i) => {
              const isActive = i === currentFile
              return (
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.5
                  }}
                  key={i}
                  className={styles.slide}>
                  <div className={styles.slideContent}>
                    <RenderFileContent
                      files={files}
                      openFile={i}
                      activeFolder={activeFolder}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </Slider>
    </div>
  )
}
