import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import api from '../../../api/api'
import { User } from '../../../interfaces/user'
import { AppDispatch } from '../../../store'
import { setUserData } from '../../../store/slices/user'

interface RegistrationData {
  login: string
  password: string
}

interface RegistrationResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const useRegUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const registration = async (value: RegistrationData) => {
    setLoading(true)

    try {
      const resData: AxiosResponse<RegistrationResponse> = await api.post(
        '/auth/register',
        {
          login: value.login,
          password: value.password
        }
      )
      localStorage.setItem('refreshToken', resData.data.refreshToken)
      dispatch(setUserData(resData.data.user))
      return { success: true }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>
      return {
        success: false,
        error: axiosError.response?.data?.message || 'Ошибка регистрации'
      }
    } finally {
      setLoading(false)
    }
  }

  const submitRegUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)
    const login = formData.get('login') as string
    const password = formData.get('password') as string

    if (!login || !password) {
      setError('Все поля обязательны')
      return
    }

    const result = await registration({ login, password })

    if (result.success) {
      setSuccess('Регистрация прошла успешно!')
      navigate('/')
    } else {
      setError(result.error ?? 'Произошла неизвестная ошибка')
    }
  }

  return { submitRegUser, registration, loading, error, success }
}
