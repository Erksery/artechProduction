import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import api from '@api'
import { AppDispatch } from '@store/index'
import { deleteFiles, updateFile } from '@store/slices/files'
import { handleApiError } from '@utils/toast/handleApiError'
import { handleApiSuccess } from '@utils/toast/handleApiSuccess'

interface EditData {
  originalFilename?: string
  folderId?: string
}

export interface EditProps {
  folderId: string | undefined
  fileId: string | undefined
  editData: EditData
}

export const useEditFile = () => {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const editMode = () => {
    setEditing(prev => !prev)
  }

  const submitEditFile = (
    e: { preventDefault: () => void },
    folderId: string | undefined,
    fileId: string
  ) => {
    e.preventDefault()
    editFile({
      folderId: folderId,
      fileId: fileId,
      editData: { originalFilename: editValue }
    })
    editMode()
  }

  useEffect(() => {
    if (editing) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [editing])

  const editFile = async ({ folderId, fileId, editData }: EditProps) => {
    try {
      const resData = await api.patch(
        `/files/folder/${folderId}/file/${fileId}`,
        {
          editData
        }
      )
      if (editData.folderId) {
        dispatch(deleteFiles([fileId || '']))
      } else {
        dispatch(updateFile(resData.data))
      }
      handleApiSuccess(resData, 'Файл успешно отредактирован')
    } catch (err) {
      handleApiError(err, 'Ошибка при редактировании файла')
    }
  }

  return {
    editFile,
    editMode,
    inputRef,
    editing,
    editValue,
    setEditValue,
    submitEditFile
  }
}
