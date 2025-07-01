import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { PortalModal } from '@components/ui/modal/PortalModal/PortalModal'

import { Upload } from '../../upload/Upload'
import styles from './AddFileModal.module.scss'
import { AddFileCard } from './card/AddFileCard'
import { useUpload } from './hooks/useUpload'

interface AddFileModalProps {
  isOpen: boolean
  closeModal: () => void
}

interface FileWithPreview extends File {
  preview?: string
}

export const AddFileModal: React.FC<AddFileModalProps> = ({
  isOpen,
  closeModal
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  )

  const { createFile } = useUpload(activeFolder)

  const deleteFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName))
  }

  const handleSuccess = (files: FileWithPreview[]) => {
    createFile(files)
    closeModal()
  }

  return (
    <PortalModal
      className={styles.modal}
      isOpen={isOpen}
      close={closeModal}>
      <div className={styles.fileAddContainer}>
        <div className={styles.upload}>
          <Upload
            files={files}
            setFiles={setFiles}
          />
        </div>
        {files.length > 0 && (
          <div className={styles.filesList}>
            {files.map((file, index) => (
              <AddFileCard
                key={index}
                file={file}
                onDelete={deleteFile}
              />
            ))}
          </div>
        )}

        <div className={styles.buttonsContainer}>
          <button
            onClick={() => handleSuccess(files)}
            disabled={files.length === 0}>
            Подтвердить
          </button>
        </div>
      </div>
    </PortalModal>
  )
}
