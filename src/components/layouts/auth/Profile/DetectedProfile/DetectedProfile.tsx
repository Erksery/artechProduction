import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '@store/index'
import { clearUserData } from '@store/slices/user'
import { User } from '@interfaces/user'
import { UserLogo } from '@components/layouts/user/logo/UserLogo'
import { SubmitButton } from '@components/ui/buttons/submit/SubmitButton'
import { Status } from '@components/ui/status/Status'

import styles from './DetectedProfile.module.scss'

interface Props {
  user: User
}

export const DetectedProfile = ({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h2>Авторизация</h2>
      <div className={styles.profileCard}>
        <div className={styles.info}>
          <UserLogo user={user} />

          <div>
            <h3>{user.login}</h3>
            <p>{user.role}</p>
          </div>
        </div>
        <Status user={user} />
      </div>

      <SubmitButton
        text='Войти'
        event={() => navigate('/')}
      />
      <button
        onClick={() => dispatch(clearUserData())}
        className={styles.exit}>
        Войти в другой аккаунт
      </button>
    </div>
  )
}
