import { SetStateAction, useEffect, useState } from 'react'

import { SubmitButton } from '../../../ui/buttons/submit/SubmitButton'
import { Input } from '../../../ui/input/Input'
import styles from './SignUp.module.scss'

interface Props {
  error: string | null
  loading: boolean
  activateTab: (name: 'register' | 'login') => void
}

export const SignUp = ({ error, loading, activateTab }: Props) => {
  const [canSubmit, setCanSubmit] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const isValid = login.trim() !== '' && password.trim() !== ''
    setCanSubmit(isValid)
  }, [login, password, setCanSubmit])
  return (
    <>
      <h2>Создать аккаунт</h2>
      <Input
        title='Логин'
        type='text'
        name='login'
        id='login'
        placeholder='Имя пользователя'
        autoComplete='current-password'
        required
        value={login}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setLogin(e.target.value)
        }
      />
      <Input
        title='Пароль'
        type='password'
        name='password'
        id='password'
        placeholder='**********'
        autoComplete='current-password'
        required
        value={password}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setPassword(e.target.value)
        }
      />
      {error && (
        <div className={styles.alert}>
          <p>{error}</p>
        </div>
      )}

      <SubmitButton
        text={loading ? 'Загрузка...' : 'Зарегистрироваться'}
        type='submit'
        disabled={!canSubmit || loading}
        className={styles.submitButton}
      />
      <div className={styles.route}>
        <p>Уже есть аккаунт?</p>
        <button
          onClick={() => activateTab('login')}
          className={styles.link}>
          Войти
        </button>
      </div>
    </>
  )
}
