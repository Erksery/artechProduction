import { useDispatch } from 'react-redux'

import api from '../../../../../../api/api'
import { AppDispatch } from '../../../../../../store'
import { updateFolder } from '../../../../../../store/slices/folders'
import { handleApiError } from '../../../../../../utils/toast/handleApiError'
import { handleApiSuccess } from '../../../../../../utils/toast/handleApiSuccess'

interface EditData {
  name?: string
  folderId?: string
  sharingOptions?: string
  privacy?: string
}

export const useEditFolder = () => {
  const dispatch = useDispatch<AppDispatch>()
  const submitEditFolder = async (folderId: string, editData: EditData) => {
    await editFolder(folderId, editData)
  }

  const editFolder = async (folderId: string, editData: EditData) => {
    try {
      const resData = await api.patch(`/folders/${folderId}`, {
        editData
      })
      console.log(resData)

      dispatch(updateFolder(resData.data))
      handleApiSuccess(resData, 'Папка успешно отредактирована')
    } catch (err) {
      console.log(err)
      handleApiError(err, 'Ошибка при редактировании папки')
    }
  }

  return {
    editFolder,
    submitEditFolder
  }
}
