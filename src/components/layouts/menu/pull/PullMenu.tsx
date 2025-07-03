import { ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'

import { useBlockScroll } from '@hooks/useBlockScroll'
import { BackgroundModal } from '@components/ui/modal/BackgroundModal/BackgroundModal'

import styles from './PullMenu.module.scss'

interface Props {
  children?: ReactNode
}

export const PullMenu = ({ children }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useBlockScroll(true)

  return (
    <BackgroundModal className={styles.background}>
      <motion.div
        ref={menuRef}
        className={styles.container}
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}>
        {children}
      </motion.div>
    </BackgroundModal>
  )
}
