import React, { useState } from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFileModal.module.scss";
import { Upload } from "../upload/Upload";
import { AddFileCard } from "./card/AddFileCard";

interface AddFileModalProps {
  closeModal: () => void;
}

interface FileWithPreview extends File {
  preview?: string;
}

export const AddFileModal: React.FC<AddFileModalProps> = ({ closeModal }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const deleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  console.log(files);

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
          <button onClick={closeModal}>Отменить</button>
          <button>Подтвердить</button>
        </div>
      </div>
    </Modal>
  );
};
