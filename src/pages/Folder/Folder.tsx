import { useParams } from 'react-router-dom'

import { useActiveFolder } from '@hooks/useActiveFolder'
import { useGetFiles } from '@hooks/useGetFiles.ts'
import { useKeyboardListener } from '@hooks/useKeyboardListener.ts'
import { FolderViewer } from '@components/layouts/folder/viewer/FolderViewer'
import { Header } from '@components/layouts/header/panel/Header.tsx'
import { SideMenu } from '@components/layouts/menu/side/SideMenu'
import { ErrorBoundary } from '@components/ui/error/ErrorBoundary.tsx'

import styles from './Folder.module.scss'

export const Folder = () => {
  const { id } = useParams()

  const { fileLoading } = useGetFiles(id)

  useActiveFolder(id)
  useKeyboardListener()

  return (
    <>
      <ErrorBoundary>
        <div className={styles.folderContainer}>
          <SideMenu />

          <div className={styles.contentContainer}>
            <Header />
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
