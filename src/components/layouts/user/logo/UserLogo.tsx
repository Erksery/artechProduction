import React from 'react'

import { User } from '../../../../interfaces/user'
import styles from './UserLogo.module.scss'

interface UserLogoProps {
  user: User | null
  className?: string
}

export const UserLogo: React.FC<UserLogoProps> = ({ user, className }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <h3>{user?.login && user.login.charAt(0)}</h3>
    </div>
  )
}
