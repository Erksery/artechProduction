import { useParams } from 'react-router-dom'

import { FolderViewer } from '../../components/layouts/folder/viewer/FolderViewer.tsx'
import { ErrorBoundary } from '../../components/ui/error/ErrorBoundary.tsx'
import { useActiveFolder } from '../../hooks/useActiveFolder.ts'
import { useGetFiles } from '../../hooks/useGetFiles.ts'
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
