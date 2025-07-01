import { useParams } from 'react-router-dom'

import { useGetFiles } from '@components/layouts/file/hooks/useGetFiles'
import { useActiveFolder } from '@components/layouts/folder/hooks/useActiveFolder.ts'
import { FolderViewer } from '@components/layouts/folder/viewer/FolderViewer.tsx'
import { ErrorBoundary } from '@components/ui/error/ErrorBoundary.tsx'

import styles from './Folder.module.scss'

export const PublicFolder = () => {
  const { id } = useParams()

  const { fileLoading } = useGetFiles(id, 'public')
  useActiveFolder(id)

  return (
    <>
      <ErrorBoundary>
        <div className={styles.folderContainer}>
          <div className={styles.contentContainer}>
            <FolderViewer
              folderId={id}
              loading={fileLoading}
            />
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}
