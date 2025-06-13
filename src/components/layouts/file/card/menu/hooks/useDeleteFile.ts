import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../../../../../../api/api'
import { AppDispatch, RootState } from '../../../../../../store'
import { deleteFile } from '../../../../../../store/slices/files'
import { handleApiError } from '../../../../../../utils/toast/handleApiError'
import { handleApiSuccess } from '../../../../../../utils/toast/handleApiSuccess'

export const useDeleteFile = () => {
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  )
  const dispatch = useDispatch<AppDispatch>()
  const fileDelete = useCallback(async (fileId: string) => {
    try {
      const resData = await api.delete(
        `/files/folder/${activeFolder}/file/${fileId}`
      )
      dispatch(deleteFile(fileId))
      handleApiSuccess(resData.data, 'Файл успешно удален')
    } catch (err) {
      console.log('Ошибка при удалении файла')
      handleApiError(err, 'Не удалось удалить файл')
    }
  }, [])

  return { fileDelete }
}
