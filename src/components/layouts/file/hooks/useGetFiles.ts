import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '@api'
import { AppDispatch, RootState } from '@store/index'
import { setFiles } from '@store/slices/files'
import { FileData } from '@interfaces/file'
import { handleApiError } from '@utils/toast/handleApiError'

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
  }, [id, file.filter, file.order, dispatch, route])

  useEffect(() => {
    if (id) {
      getFiles()
    }
  }, [getFiles, id])

  return { fileLoading }
}
