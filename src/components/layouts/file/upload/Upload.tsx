import styles from "./Upload.module.scss";
import { MdOutlineUploadFile } from "react-icons/md";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadProps {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

export const Upload: React.FC<UploadProps> = ({ files, setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const fileArray = Array.from(newFiles).map((file) => {
      (file as FileWithPreview).preview = URL.createObjectURL(file);
      return file as FileWithPreview;
    });
    setFiles((prevFiles) => [...prevFiles, ...fileArray]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFile(event.dataTransfer.files);
    setIsDragging(false);
  };

  console.log(files);

  return (
    <motion.label
      htmlFor="file-upload"
      className={`${styles.uploadCard} ${isDragging ? styles.dragging : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={uploadRef}
      />

      <motion.div
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 15, scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <MdOutlineUploadFile size={48} />
      </motion.div>

      <p>
        <b>Нажмите</b> или перетащите, чтобы загрузить файл
      </p>
      <label>Максимальный размер файла не ограничен (пока)</label>
    </motion.label>
  );
};
