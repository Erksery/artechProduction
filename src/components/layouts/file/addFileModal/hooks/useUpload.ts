import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { addFiles } from "../../../../../store/slices/files";

interface FileWithPreview extends File {
  preview?: string;
}

export const useUpload = (id: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const createFile = async (
    selectedFiles: FileWithPreview[]
  ): Promise<void> => {
    if (!selectedFiles) return;

    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/files/createFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            folder: id,
          },
        });
        dispatch(addFiles([response.data.file]));
        return response.data.file;
      });

      await Promise.all(uploadPromises);
    } catch (err) {
      console.error("Ошибка загрузки файлов:", err);
    }
  };
  return {
    createFile,
  };
};
