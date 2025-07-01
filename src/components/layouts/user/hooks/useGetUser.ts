import { useCallback, useState } from 'react'
import { AxiosResponse } from 'axios'

import api from '@api'
import { User } from '@interfaces/user'
import { handleApiError } from '@utils/toast/handleApiError'

type UserResponse = User

export const useGetUser = () => {
  const [userData, setUserData] = useState<User | null>(null)

  const getUser = useCallback(async (userId: string) => {
    try {
      const cachedUser = localStorage.getItem(`user_${userId}`)
      if (cachedUser) {
        const parsedUser = JSON.parse(cachedUser) as User
        setUserData(parsedUser)
        return parsedUser
      }
      const resData: AxiosResponse<UserResponse> = await api.get(
        `/auth/${userId}`
      )
      setUserData(resData.data)
      localStorage.setItem(`user_${userId}`, JSON.stringify(resData.data))
      return resData.data
    } catch (err) {
      handleApiError(err, 'Не удалось получить данные пользователя')
    }
  }, [])

  return { getUser, userData }
}
