import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'

import { FilesList } from '../../file/list/FilesList'
import { FolderListGrid } from '../list/grid/FolderListGrid'
import { EmptyList } from './EmptyList/EmptyList'
import styles from './FolderViewer.module.scss'
import { ToolsLine } from './ToolsLine/ToolsLine'

interface Props {
  folderId: string | undefined
  loading: boolean
}

export const FolderViewer = ({ folderId, loading }: Props) => {
  const files = useSelector((state: RootState) => state.files.files)
  const folders = useSelector((state: RootState) => state.folders.folders)

  const subFolders = useMemo(
    () => folders.filter(subFolder => subFolder.inFolder === folderId),
    [folders, folderId]
  )

  console.log('rerender folder view')

  return (
    <div className={styles.viewer}>
      <ToolsLine />
      <div className={styles.list}>
        <FolderListGrid subFolders={subFolders} />
      </div>
      <div className={styles.list}>
        {files.length <= 0 && !loading ? (
          <EmptyList />
        ) : (
          <FilesList
            files={files}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}
