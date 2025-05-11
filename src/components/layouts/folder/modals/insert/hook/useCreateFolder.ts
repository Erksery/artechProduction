import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store";
import { addFolder } from "../../../../../../store/slices/folders";
import api from "../../../../../../api/api";
import { handleApiSuccess } from "@utils/toast/handleApiSuccess";
import { handleApiError } from "@utils/toast/handleApiError";

export const useCreateFolder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.folders.activeFolder);

  const createFolder = useCallback(
    async (folderName?: string, inFolder?: boolean) => {
      try {
        const resData = await api.post("/folders/", {
          name: folderName || "Folder",
          folderId: inFolder ? id : null,
        });

        if (resData?.data) {
          console.log(resData.data);
          dispatch(addFolder([resData.data]));
          handleApiSuccess(resData, "Папка успешно добавлена");
        } else {
          console.error("Некорректный ответ от сервера", resData);
        }
      } catch (err) {
        console.error("Ошибка при создании папки", err);
        handleApiError(err, "Ошибка при создании папки");
      }
    },
    [id, dispatch]
  );

  return { createFolder };
};
