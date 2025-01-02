import axios from "axios";

interface FileWithPreview extends File {
  preview?: string;
}

export const useUpload = (id: number) => {
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
