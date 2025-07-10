import { useCallback } from 'react'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'

import api from '@api'
import { AppDispatch } from '@store/index'
import { removeFolder } from '@store/slices/folders'
import { handleApiError } from '@utils/toast/handleApiError'
import { handleApiSuccess } from '@utils/toast/handleApiSuccess'

export const useDeleteFolder = () => {
  const dispatch = useDispatch<AppDispatch>()

  const deleteFolder = useCallback(
    async (id: string) => {
      try {
        const resData: AxiosResponse = await api.delete(`/folders/${id}`, {})
        if (resData.status === 200) {
          dispatch(removeFolder(id))
        }
        handleApiSuccess(resData?.data?.message || 'Папка успешно удалена')
      } catch (err) {
        console.log('Ошибка при удалении папки', err)
        handleApiError('Ошибка при удалении папки')
      }
    },
    [dispatch]
  )

  return { deleteFolder }
}
