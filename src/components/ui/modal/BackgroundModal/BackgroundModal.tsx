import { ReactNode } from 'react'
import { motion } from 'framer-motion'

import styles from './BackgroundModal.module.scss'

interface Props {
  children: ReactNode
  className?: string
}
export const BackgroundModal: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.bg} modal ${className}`}>
      {children}
    </motion.div>
  )
}
