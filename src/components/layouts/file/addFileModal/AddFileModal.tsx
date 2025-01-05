import React, { useState } from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFileModal.module.scss";
import { Upload } from "../upload/Upload";
import { AddFileCard } from "./card/AddFileCard";
import { useUpload } from "./hooks/useUpload";

interface AddFileModalProps {
  closeModal: () => void;
}

interface FileWithPreview extends File {
  preview?: string;
}

export const AddFileModal: React.FC<AddFileModalProps> = ({ closeModal }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { createFile } = useUpload(1);

  const deleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSuccess = (files: FileWithPreview[]) => {
    createFile(files);
    closeModal();
  };

  return (
    <Modal>
      <div className={styles.fileAddContainer}>
        <div className={styles.upload}>
          <Upload files={files} setFiles={setFiles} />
        </div>
        {files.length > 0 && (
          <div className={styles.filesList}>
            {files.map((file, index) => (
              <AddFileCard key={index} file={file} onDelete={deleteFile} />
            ))}
          </div>
        )}

        <div className={styles.buttonsContainer}>
          <button
            onClick={() => handleSuccess(files)}
            disabled={files.length === 0}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
