import { MdOutlineDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { useDeleteFile } from '@components/layouts/file/card/menu/hooks/useDeleteFile'

import { useCopyFiles } from './hooks/useCopyFiles'
import { usePasteFiles } from './hooks/usePasteFiles'
import styles from './Tools.module.scss'
import { toolsButtons } from './ToolsButtons'

export const Tools = () => {
  const folderId = useSelector((state: RootState) => state.folders.activeFolder)

  const { pasteFilesToFolder } = usePasteFiles()
  const { copyFiles } = useCopyFiles()
  const { fileDelete } = useDeleteFile()

  const buttons = toolsButtons({
    folderId,
    pasteFilesToFolder,
    copyFiles
  })

  return (
    <div className={styles.tools}>
      <div className={styles.block}>
        {buttons.map(button => (
          <button
            key={button.id}
            onClick={button.event}
            className={styles.toolButton}>
            {button.icon}
            {button.title}
          </button>
        ))}
      </div>
      <button
        onClick={() => fileDelete()}
        className={`${styles.toolButton} ${styles.deleteButton}`}>
        <MdOutlineDelete />
        Удалить
      </button>
    </div>
  )
}
