import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { handleApiError } from '@utils/toast/handleApiError'
import { handleApiSuccess } from '@utils/toast/handleApiSuccess'

export const useCopyFiles = () => {
  const files = useSelector((state: RootState) => state.files.selectedFiles)
  const copyFiles = () => {
    try {
      localStorage.setItem('buffer', JSON.stringify(files))
      handleApiSuccess('Файл скопирован')
    } catch (err) {
      handleApiError('Ошибка при копировании')
    }
  }

  return { copyFiles }
}
