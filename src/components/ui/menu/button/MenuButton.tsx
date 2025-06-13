import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

import styles from './MenuButton.module.scss'

interface MenuButtonProps {
  event: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon: ReactNode
  title: string
  description?: string
  height?: number
  red?: boolean
  className?: string
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  event,
  icon,
  title,
  description,
  height = 40,
  red = false,
  className
}) => {
  return (
    <motion.button
      onClick={event}
      whileHover={{
        scale: 0.95
      }}
      whileTap={{
        scale: 0.9
      }}
      className={`${styles.buttonContainer} ${red && styles.red} ${className}`}
      style={{ height: height }}>
      {icon}
      <div className={styles.info}>
        <p>{title}</p>
        {description && <label>{description}</label>}
      </div>
    </motion.button>
  )
}
