import api from "@api";
import { AppDispatch } from "@store/index";
import { addFiles } from "@store/slices/files";
import { handleApiError } from "@utils/toast/handleApiError";
import { handleApiSuccess } from "@utils/toast/handleApiSuccess";
import { useDispatch } from "react-redux";

export const usePasteFiles = () => {
  const dispatch = useDispatch<AppDispatch>();

  const pasteFilesToFolder = async (folderId: string) => {
    try {
      if (!folderId) {
        throw new Error("ID папки отсутствует");
      }
      const buffer = localStorage.getItem("buffer");

      if (!buffer) {
        throw new Error("Буфер пуст");
      }

      const parsedFiles = JSON.parse(buffer);

      if (!Array.isArray(parsedFiles)) {
        throw new Error("Неверный формат данных в буфере");
      }
      const resData = await api.post(`/files/folder/${folderId}`, {
        files: parsedFiles,
      });

      dispatch(addFiles(resData.data));
      handleApiSuccess(resData, "Файлы успешно вставлены");
    } catch (err) {
      console.log(err);
      handleApiError(err, "Ошибка при вставке файлов");
    }
  };

  return { pasteFilesToFolder };
};
