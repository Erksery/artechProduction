import { useState } from "react";

interface FileWithPreview extends File {
  preview?: string;
}

export const useSelectedFiles = (
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>
) => {
  const [isDragging, setIsDragging] = useState(false);

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

  return {
    isDragging,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
