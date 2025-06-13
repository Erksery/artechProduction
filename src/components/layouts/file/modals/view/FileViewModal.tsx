import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdFileDownload } from 'react-icons/md'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'

import { useDownload } from '../../../../../hooks/useDownload'
import { MenuContainer } from '../../../../ui/menu/container/MenuContainer'
import { Modal } from '../../../../ui/modal/Modal'
import styles from './FileViewModal.module.scss'
import { FileSettingMenu } from './menu/FileSettingMenu'
import { renderFileContent } from './RenderFileContent'

interface FileViewModalProps {
  activeFile: number
}

export const FileViewModal: React.FC<FileViewModalProps> = ({ activeFile }) => {
  const [openFile, setOpenFile] = useState(activeFile)
  const [menuOpen, setMenuOpen] = useState(false)

  const files = useSelector((state: RootState) => state.files.files)
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  )

  const { downloadFile } = useDownload()

  const forwardList = () => {
    if (files.length - 1 !== openFile) {
      setOpenFile(prev => prev + 1)
    }
  }

  const backList = () => {
    if (openFile !== 0) {
      setOpenFile(prev => prev - 1)
    }
  }

  const currentFile = files[openFile]

  return (
    <Modal className={styles.modal}>
      {currentFile && (
        <div className={styles.fileView}>
          <div className={styles.gallery}>
            <button
              onClick={backList}
              className={styles.but}
              disabled={files[openFile - 1] ? false : true}>
              <motion.div
                whileHover={{
                  x: -5
                }}>
                <FaChevronLeft />
              </motion.div>
            </button>

            <div className={styles.viewer}>
              {renderFileContent({ files, openFile, activeFolder })}
            </div>

            <button
              onClick={forwardList}
              className={styles.but}
              disabled={files[openFile + 1] ? false : true}>
              <motion.div
                whileHover={{
                  x: +5
                }}>
                <FaChevronRight />
              </motion.div>
            </button>
          </div>
          <div className={styles.info}>
            <div className={styles.null}></div>
            <div className={styles.name}>
              <p>{files[openFile].originalFilename}</p>
            </div>

            <div className={styles.tools}>
              <motion.button
                onClick={() => downloadFile(activeFolder, files[openFile].name)}
                whileHover={{
                  scale: 0.9
                }}
                whileTap={{
                  scale: 0.85
                }}>
                <MdFileDownload />
              </motion.button>
              <MenuContainer
                element={<FileSettingMenu />}
                open={menuOpen}
                setOpen={setMenuOpen}>
                <motion.button
                  whileHover={{
                    scale: 0.9
                  }}
                  whileTap={{
                    scale: 0.85
                  }}>
                  <IoSettingsSharp />
                </motion.button>
              </MenuContainer>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
