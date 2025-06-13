import { ReactNode, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { useBlockScroll } from '../../../../hooks/useBlockScroll'
import { useClickOutside } from '../../../../hooks/useClickOutside'
import { useModal } from '../../../../hooks/useModal'
import { BackgroundModal } from '../BackgroundModal/BackgroundModal'
import styles from './PortalModal.module.scss'

interface Props {
  children?: ReactNode
  className?: string
}

const modalRoot = document.getElementById('modal-root')!

export const PortalModal = ({ children, className }: Props) => {
  const modalRef = useRef(null)

  const { closeModal } = useModal()

  useBlockScroll(true)
  useClickOutside(modalRef, closeModal)

  return createPortal(
    <AnimatePresence>
      <BackgroundModal>
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className={styles.modal}>
          <button onClick={closeModal}>Закрыть</button>
          <div className={`${styles.container} ${className}`}>{children}</div>
        </motion.div>
      </BackgroundModal>
    </AnimatePresence>,
    modalRoot
  )
}
