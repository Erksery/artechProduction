import { MdFileDownload, MdSettings } from 'react-icons/md'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { useDownload } from '@components/layouts/file/hooks/useDownload'

import styles from './FileViewModal.module.scss'

export const FileViewTools = () => {
  const files = useSelector((state: RootState) => state.files.files)
  const activeFile = useSelector((state: RootState) => state.files.activeFile)
  const { downloadFile } = useDownload()

  const currentFile = files[+activeFile]

  return (
    <div className={styles.tools}>
      <button
        className={styles.download}
        onClick={() => downloadFile(currentFile.folderId, currentFile)}>
        <MdFileDownload />
      </button>
      <button className={styles.setting}>
        <MdSettings />
      </button>
    </div>
  )
}
