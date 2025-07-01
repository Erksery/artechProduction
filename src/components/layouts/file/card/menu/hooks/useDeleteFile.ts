import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '@api'
import { AppDispatch, RootState } from '@store/index'
import { deleteFiles } from '@store/slices/files'
import { handleApiError } from '@utils/toast/handleApiError'
import { handleApiSuccess } from '@utils/toast/handleApiSuccess'

export const useDeleteFile = () => {
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  )
  const dispatch = useDispatch<AppDispatch>()
  const selectedFiles = useSelector(
    (state: RootState) => state.files.selectedFiles
  )
  const fileDelete = useCallback(
    async (filesId?: string[]) => {
      try {
        const resData = await api.delete(`/files/folder/${activeFolder}`, {
          data: {
            filesId: filesId || selectedFiles
          }
        })

        dispatch(deleteFiles(filesId || selectedFiles))
        handleApiSuccess(resData.data, 'Файл успешно удален')
      } catch (err) {
        console.log('Ошибка при удалении файла')
        handleApiError(err, 'Не удалось удалить файл')
      }
    },
    [selectedFiles, activeFolder, dispatch]
  )

  return { fileDelete }
}
