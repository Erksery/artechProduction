import { useLocation } from 'react-router-dom'

import api from '@api'
import { FileData } from '@interfaces/file'

export const useDownload = () => {
  const { pathname } = useLocation()
  const downloadFile = async (folderId: string | undefined, file: FileData) => {
    try {
      const isPublic = pathname.startsWith('/shared')
      const resData = await api.get(
        `/${isPublic ? 'public' : 'files'}/download/folder/${folderId}`,
        {
          params: {
            fileName: file.name,
            fileType: file.mimeType
          },
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([resData.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      console.log('Ошибка при скачивании файла:', err)
    }
  }

  return { downloadFile }
}
