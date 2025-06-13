import { ReactNode } from 'react'

import styles from './Description.module.scss'

interface Props {
  children: ReactNode
}

export const Description = ({ children }: Props) => {
  return <p className={styles.description}>{children}</p>
}
