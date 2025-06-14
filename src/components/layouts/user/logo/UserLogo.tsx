import React, { useMemo } from 'react'

import { User } from '@interfaces/user'

import styles from './UserLogo.module.scss'

interface UserLogoProps {
  user: User | null
  className?: string
}

export const UserLogo: React.FC<UserLogoProps> = ({ user, className }) => {
  const userChar = useMemo(
    () => user?.login && user.login.charAt(0),
    [user?.login]
  )
  return <div className={`${styles.logo} ${className}`}>{userChar ?? '?'}</div>
}
