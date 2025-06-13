import { ReactNode } from 'react'

import styles from './CardButton.module.scss'

interface CardButtonProps {
  title: string
  description?: string
  icon: ReactNode
  active: boolean
  event: () => void
}

export const CardButton: React.FC<CardButtonProps> = ({
  title,
  description,
  icon,
  active = true,
  event
}) => {
  return (
    <button
      onClick={event}
      className={`${styles.cardButton} ${active ? styles.active : ''}`}>
      {icon}
      <div className={styles.info}>
        <p>{title}</p>
        {description && <label>{description}</label>}
      </div>
    </button>
  )
}
