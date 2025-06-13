import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../api/api'
import { FileData } from '../interfaces/file'
import { AppDispatch, RootState } from '../store'
import { setFiles } from '../store/slices/files'
import { handleApiError } from '../utils/toast/handleApiError'

export const useGetFiles = (id: string | undefined, route = 'files') => {
  const [fileLoading, setFileLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const file = useSelector((state: RootState) => state.files)

  const getFiles = useCallback(async () => {
    setFileLoading(true)
    try {
      dispatch(setFiles([]))
      const filesResData = await api.get<FileData[]>(`/${route}/folder/${id}`, {
        params: {
          filter: `${file.filter.name}=${file.filter.value}`,
          order: `${file.order.name}=${file.order.value}`
        }
      })
      dispatch(setFiles(filesResData.data))
    } catch (err) {
      handleApiError(err, 'Не удалось загрузить файлы')
    } finally {
      setFileLoading(false)
    }
  }, [id, file.filter, file.order])

  useEffect(() => {
    if (id) {
      getFiles()
    }
  }, [id, file.filter, file.order, getFiles])

  return { fileLoading }
}
