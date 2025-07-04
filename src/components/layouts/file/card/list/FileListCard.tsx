import { fileTypes } from '@config/fileTypes'
import { imageTypes } from '@config/imageTypes'
import { FileData } from '@interfaces/file'

import FileImage from '../../image/FileImage'
import { useFileCardLogic } from '../hooks/useFileCardLogic'
import styles from './FileListCard.module.scss'

interface Props {
  file: FileData
  handleLink: (file: FileData) => void
}

export const FileListCard = ({ file, handleLink }: Props) => {
  const { activeFolder, fileSvg, fileSize, fileCreateDate } =
    useFileCardLogic(file)

  return (
    <div
      onClick={() => handleLink(file)}
      className={styles.card}>
      <div className={styles.view}>
        {imageTypes.includes(file.mimeType) ? (
          <FileImage
            src={file.name}
            folderId={activeFolder}
            className={styles.image}
          />
        ) : (
          <div className={styles.fileIcon}>
            {fileSvg ? fileSvg.svg : fileTypes[0].svg}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{file.originalFilename}</p>
        <p className={styles.size}>{fileSize}</p>
        <p className={styles.size}>{fileCreateDate}</p>
      </div>
    </div>
  )
}
