import { ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'

import { useBlockScroll } from '@hooks/useBlockScroll'
import { useClickOutside } from '@hooks/useClickOutside'
import { BackgroundModal } from '@components/ui/modal/BackgroundModal/BackgroundModal'

import styles from './PullMenu.module.scss'

interface Props {
  children?: ReactNode
  left?: boolean
  header?: boolean
  isOpen: boolean
  closeModal: () => void
}

export const PullMenu = ({
  children,
  left = true,
  header = true,
  isOpen,
  closeModal
}: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useBlockScroll(isOpen)
  useClickOutside(menuRef, closeModal)

  return (
    <BackgroundModal
      className={`${styles.background} ${left ? styles.left : ''}`}>
      <motion.div
        ref={menuRef}
        className={styles.container}
        initial={{ x: left ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: left ? '-100%' : '100%' }}
        transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}>
        {header && (
          <div>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        )}

        {children}
      </motion.div>
    </BackgroundModal>
  )
}
