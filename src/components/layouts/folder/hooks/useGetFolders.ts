import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import api from '@api'
import { AppDispatch } from '@store/index'
import { setFolders } from '@store/slices/folders'
import { handleApiError } from '@utils/toast/handleApiError'

export const useGetFolders = () => {
  const dispatch = useDispatch<AppDispatch>()

  const getFolders = useCallback(async () => {
    try {
      const foldersResData = await api.get('/folders/')

      dispatch(setFolders(foldersResData.data))
    } catch (err) {
      handleApiError('Не удалось загрузить папки')
    }
  }, [dispatch])

  useEffect(() => {
    getFolders()
  }, [getFolders])

  return { getFolders }
}
