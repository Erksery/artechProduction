import { useNavigate } from 'react-router-dom'

import { fileTypes } from '@config/fileTypes'
import { imageTypes } from '@config/imageTypes'
import { FileData } from '@interfaces/file'
import { useActiveFile } from '@components/layouts/file/hooks/useActiveFile'

import FileImage from '../../image/FileImage'
import { useFileCardLogic } from '../hooks/useFileCardLogic'
import styles from './FileListCard.module.scss'

interface Props {
  file: FileData
}

export const FileListCard = ({ file }: Props) => {
  const navigate = useNavigate()
  const { activeFolder, fileSvg, fileSize, fileCreateDate } =
    useFileCardLogic(file)
  const { selectActiveFile } = useActiveFile()

  const handleLink = () => {
    selectActiveFile(file.id)
    navigate(`/folder/${file.folderId}`)
  }

  return (
    <div
      onClick={handleLink}
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
