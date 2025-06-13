import api from '../api/api'

export const useDownload = () => {
  const downloadFile = async (
    folderId: string | undefined,
    fileName: string
  ) => {
    try {
      const resData = await api.get(`/files/download/folder/${folderId}`, {
        params: {
          fileName: fileName
        },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([resData.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      console.log('Ошибка при скачивании файла')
    }
  }

  return { downloadFile }
}
