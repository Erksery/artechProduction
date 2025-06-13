import { UserCard } from '../card/UserCard'
import { useGetUsers } from './hooks/useGetUsers'
import styles from './UsersList.module.scss'

interface Props {
  className?: string
}
export const UsersList = ({ className }: Props) => {
  const { users } = useGetUsers()

  return (
    <div className={`${styles.container} ${className}`}>
      {users &&
        users.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
    </div>
  )
}
