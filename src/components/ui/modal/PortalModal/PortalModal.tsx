import { ReactNode, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { CgClose } from 'react-icons/cg'

import { useBlockScroll } from '@hooks/useBlockScroll'
import { useClickOutside } from '@hooks/useClickOutside'

import { BackgroundModal } from '../BackgroundModal/BackgroundModal'
import styles from './PortalModal.module.scss'

interface Props {
  isOpen: boolean
  close: () => void
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

const modalRoot = document.getElementById('modal-root')!

export const PortalModal = ({
  isOpen,
  close,
  footer,
  children,
  className
}: Props) => {
  const modalRef = useRef(null)

  useBlockScroll(isOpen)

  useClickOutside(modalRef, close)

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <BackgroundModal>
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className={`${styles.modal} ${className}`}>
            <div className={styles.header}>
              <button
                onClick={close}
                className={styles.close}>
                <CgClose />
              </button>
            </div>

            {children}

            <div className={styles.footer}>
              {footer && <div className={styles.container}>{footer}</div>}
            </div>
          </motion.div>
        </BackgroundModal>
      )}
    </AnimatePresence>,
    modalRoot
  )
}
