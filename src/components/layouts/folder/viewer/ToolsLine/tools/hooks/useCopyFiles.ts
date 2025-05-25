import { RootState } from "@store/index";
import { handleApiError } from "@utils/toast/handleApiError";
import { handleApiSuccess } from "@utils/toast/handleApiSuccess";
import { useSelector } from "react-redux";

export const useCopyFiles = () => {
  const files = useSelector((state: RootState) => state.files.selectedFiles);
  const copyFiles = () => {
    try {
      localStorage.setItem("buffer", JSON.stringify(files));
      handleApiSuccess("", "файл скопирован");
    } catch (err) {
      handleApiError(err, "Ошибка при копировании");
    }
  };

  return { copyFiles };
};
