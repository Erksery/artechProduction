import { User } from '@interfaces/user'
import { Status } from '@components/ui/status/Status'

import { UserLogo } from '../logo/UserLogo'
import styles from './UserCard.module.scss'

interface Props {
  user: User
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoBlock}>
        <UserLogo user={user} />
        <div>
          <h3>{user.login}</h3>
          <p>{user.role}</p>
        </div>
      </div>

      <Status user={user} />
    </div>
  )
}
