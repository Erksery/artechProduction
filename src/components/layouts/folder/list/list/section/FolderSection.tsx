import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoChevronDown } from 'react-icons/go'

import { FolderData } from '@interfaces/folder'
import { FolderCardList } from '@components/layouts/folder/card/list/FolderCardList'

import styles from './FolderSection.module.scss'

interface Props {
  parentFolderList: FolderData[]
  folders: FolderData[]
  title: string
  icon: ReactNode
}

export const FolderSection = ({
  parentFolderList,
  folders,
  title,
  icon
}: Props) => {
  const [openSection, setOpenSection] = useState<boolean>(true)

  const toggleOpenSection = () => {
    setOpenSection((prev: boolean) => !prev)
  }

  return (
    <div className={styles.privacyFolderContainer}>
      <button
        onClick={toggleOpenSection}
        className={styles.sectionButton}>
        <div className={styles.iconContainer}>
          {icon}
          <p>{title}</p>
        </div>
        <div className={`${styles.chevron} ${openSection && styles.rotate}`}>
          <GoChevronDown />
        </div>
      </button>
      <AnimatePresence>
        {openSection && (
          <>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.folderList}>
              {parentFolderList.map(folder => (
                <FolderCardList
                  key={folder.id}
                  folder={folder}
                  folders={folders}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
