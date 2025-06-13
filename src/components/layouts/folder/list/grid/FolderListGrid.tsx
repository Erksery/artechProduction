import { FolderData } from '../../../../../interfaces/folder'
import { FolderCardGrid } from '../../card/grid/FolderCardGrid'
import styles from './FolderListGrid.module.scss'

interface Props {
  subFolders: FolderData[]
}

export const FolderListGrid = ({ subFolders }: Props) => {
  return (
    <div className={styles.table}>
      {subFolders.map(folder => (
        <FolderCardGrid
          key={folder.id}
          folder={folder}
        />
      ))}
    </div>
  )
}
