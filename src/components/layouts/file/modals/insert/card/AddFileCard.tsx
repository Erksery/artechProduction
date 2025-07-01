import React, { useMemo } from 'react'
import { MdOutlineDelete } from 'react-icons/md'

import { fileTypes } from '@config/fileTypes'
import { imageTypes } from '@config/imageTypes'
import { useFormat } from '@hooks/useFormat'
import { useSvgType } from '@components/layouts/file/card/hooks/useSvgType'

import styles from './AddFileCard.module.scss'

interface FileWithPreview extends File {
  preview?: string
}

interface AddFileCardProps {
  file: FileWithPreview
  onDelete: (fileName: string) => void
}

export const AddFileCard: React.FC<AddFileCardProps> = ({ file, onDelete }) => {
  const { formatFileSize } = useFormat()
  const { fileSvg } = useSvgType(file.type)

  const imageView = (file: FileWithPreview) => {
    const imageType = useMemo(() => imageTypes.includes(file.type), [file.type])
    if (imageType) {
      return (
        <img
          className={styles.preview}
          src={file.preview}
          alt='preview'
        />
      )
    } else {
      return (
        <div className={styles.fileIcon}>
          {fileSvg ? fileSvg?.svg : fileTypes[0]?.svg}
        </div>
      )
    }
  }

  return (
    <div className={styles.fileCard}>
      <div className={styles.icon}>{imageView(file)}</div>
      <div className={styles.info}>
        <p>{file.name}</p>
        <label>{formatFileSize(file.size)}</label>
        <label>{file.type}</label>
      </div>
      <div className={styles.delete}>
        <button onClick={() => onDelete(file.name)}>
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  )
}
