import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'
import { Slider } from '@components/ui/slider/Slider'

import styles from './FileViewModal.module.scss'
import { FileViewTools } from './FileViewTools'
import { RenderFileContent } from './RenderFileContent'

interface Props {
  activeFolder: string | undefined
  isOpen: boolean
  closeModal: () => void
}

export const FileModalViewer = ({
  activeFolder,
  isOpen,
  closeModal
}: Props) => {
  const files = useSelector((state: RootState) => state.files.files)

  return (
    <PortalModal
      isOpen={isOpen}
      close={closeModal}
      className={styles.viewModal}
      footer={<FileViewTools />}>
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
    </PortalModal>
  )
}
