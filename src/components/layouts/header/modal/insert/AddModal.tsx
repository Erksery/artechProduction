import { motion } from 'framer-motion'
import { FiFilePlus } from 'react-icons/fi'
import { MdOutlineFolderCopy } from 'react-icons/md'

import { useModal } from '@hooks/modal/useModal'

import styles from './AddModal.module.scss'

interface AddModalProps {
  setOpenMenu: (isOpen: boolean) => void
  setUploadModal: (isOpen: boolean) => void
}

export const AddModal: React.FC<AddModalProps> = ({
  setOpenMenu,
  setUploadModal
}) => {
  const { openModal, closeModal } = useModal()

  const buttons = [
    {
      id: 1,
      title: 'Загрузить файл',
      description: 'Создает файл в папке',
      icon: <FiFilePlus />,
      event: () => {
        setUploadModal(true)
        setOpenMenu(false)
      }
    },
    {
      id: 2,
      title: 'Создать папку',
      description: 'Создает папку в директории',
      icon: <MdOutlineFolderCopy />,
      event: () => {
        openModal({
          name: 'insertFolderModal',
          props: { closeModal: closeModal }
        })
        setOpenMenu(false)
      }
    }
  ]

  return (
    <>
      <motion.div
        className={styles.addModal}
        initial='hidden'
        animate='visible'>
        {buttons.map((button, index) => (
          <motion.button
            onClick={button.event}
            key={button.id}
            custom={index}
            whileHover={{
              scale: 0.9
            }}
            whileTap={{
              scale: 0.85
            }}
            className={styles.button}>
            {button.icon}
            <div className={styles.info}>
              <p>{button.title}</p>
              <label>{button.description}</label>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
