import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../store";
import { removeFolder } from "../../../../../../store/slices/folders";
import api from "../../../../../../api/api";
import { handleApiSuccess } from "@utils/toast/handleApiSuccess";
import { handleApiError } from "@utils/toast/handleApiError";

export const useDeleteFolder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteFolder = useCallback(
    async (id: string) => {
      try {
        const resData = await api.delete(`/folders/${id}`, {});
        if (resData.status === 200) {
          dispatch(removeFolder(id));
        }
        handleApiSuccess(resData, "Папка успешно удалена");
      } catch (err) {
        console.log("Ошибка при удалении папки", err);
        handleApiError(err, "Ошибка при удалении папки");
      }
    },
    [dispatch]
  );

  return { deleteFolder };
};
