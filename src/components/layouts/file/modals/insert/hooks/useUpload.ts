import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../store";
import { addFiles } from "../../../../../../store/slices/files";
import api from "../../../../../../api/api";
import { useState } from "react";
import { handleApiError } from "../../../../../../utils/toast/handleApiError";

interface FileWithPreview extends File {
  preview?: string;
}

export const useUpload = (id: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const [progress, setProgress] = useState<number>(0);

  const createFile = async (
    selectedFiles: FileWithPreview[]
  ): Promise<void> => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post(`/upload/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((event.loaded * 100) / event.total));
            }
          },
        });

        dispatch(addFiles([response.data.file]));
        return response.data.file;
      });

      await Promise.all(uploadPromises);
    } catch (err) {
      handleApiError(err, "Ошибка при загрузке файлов");
    } finally {
      setProgress(0);
    }
  };

  return {
    createFile,
    progress,
  };
};
