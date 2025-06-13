import { STATUS_VALUES } from '@config/constants'
import { User } from '@interfaces/user'

import styles from './Status.module.scss'

interface Props {
  user: User
}

interface Status {
  id: number
  text: string
  color: 'red' | 'green'
  status: string
}

export const Status = ({ user }: Props) => {
  const userStatus = (): Status[] => [
    {
      id: 1,
      text: 'Подтвержден',
      color: 'green',
      status: STATUS_VALUES.APPROVED
    },
    {
      id: 3,
      text: 'Не подтвержден',
      color: 'red',
      status: STATUS_VALUES.PENDING
    }
  ]

  const currentStatus = userStatus().find(s => s.status === user.status)

  return (
    <div
      className={`${styles.container} ${
        currentStatus?.color && styles[currentStatus?.color]
      }`}>
      <p>{user.status}</p>
    </div>
  )
}
