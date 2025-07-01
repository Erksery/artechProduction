import { useCallback, useEffect, useRef } from 'react'
import { API_ROUTES } from '@routes'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import api from '@api'
import { AppDispatch } from '@store/index'
import { setUserData } from '@store/slices/user'
import { User } from '@interfaces/user'
import { handleApiError } from '@utils/toast/handleApiError'

type ProfileResponse = User

export const useGetUserData = () => {
  const navigateRef = useRef(useNavigate())
  const dispatch = useDispatch<AppDispatch>()

  const location = useLocation()

  const isPublic = location.pathname.startsWith('/shared')

  const getUser = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken && !isPublic) {
      navigateRef.current('/sign')
      console.log('Отсутствует токен авторизации')
      return
    }
    try {
      const resData: AxiosResponse<ProfileResponse> = await api.get(
        API_ROUTES.PROFILE,
        {
          withCredentials: true
        }
      )
      dispatch(setUserData(resData.data))
    } catch (err) {
      handleApiError(err, 'Ошибка авторизации')
    }
  }, [dispatch, isPublic])

  useEffect(() => {
    getUser()
  }, [getUser])

  return getUser
}
