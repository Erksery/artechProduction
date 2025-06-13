import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineUploadFile } from 'react-icons/md'

import { useSelectedFiles } from './hooks/useSelectedFiles'
import styles from './Upload.module.scss'

interface FileWithPreview extends File {
  preview?: string
}

interface UploadProps {
  files: FileWithPreview[]
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>
}

export const Upload: React.FC<UploadProps> = ({ setFiles }) => {
  const uploadRef = useRef<HTMLInputElement | null>(null)

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange
  } = useSelectedFiles(setFiles)

  return (
    <motion.label
      htmlFor='file-upload'
      className={`${styles.uploadCard} ${isDragging ? styles.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <input
        type='file'
        id='file-upload'
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={uploadRef}
      />

      <motion.div
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 15, scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}>
        <MdOutlineUploadFile size={48} />
      </motion.div>

      <p>
        <b>Нажмите</b> или перетащите, чтобы загрузить файл
      </p>
      <label>Максимальный размер файла не ограничен (пока)</label>
    </motion.label>
  )
}
