import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { handleApiError } from '@utils/toast/handleApiError'
import { useCopyFiles } from '@components/layouts/folder/viewer/ToolsLine/tools/hooks/useCopyFiles'
import { usePasteFiles } from '@components/layouts/folder/viewer/ToolsLine/tools/hooks/usePasteFiles'

export const useKeyboardListener = () => {
  const files = useSelector((state: RootState) => state.files.selectedFiles)
  const folderId = useSelector((state: RootState) => state.folders.activeFolder)

  const { copyFiles } = useCopyFiles()
  const { pasteFilesToFolder } = usePasteFiles()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault()
        copyFiles()
      }

      if (e.ctrlKey && e.key.toLowerCase() === 'v') {
        e.preventDefault()
        if (folderId) {
          pasteFilesToFolder(folderId)
        } else {
          handleApiError('folderId отсутствует, вставка отменена')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [files, folderId, copyFiles, pasteFilesToFolder])
}
