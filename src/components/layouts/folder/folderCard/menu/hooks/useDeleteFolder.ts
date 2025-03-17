import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../store";
import { removeFolder } from "../../../../../../store/slices/folders";
import api from "../../../../../../api/api";

export const useDeleteFolder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteFolder = useCallback(
    async (id: string) => {
      try {
        const resData = await api.delete(`/folders/${id}`, {});
        if (resData.status === 200) {
          dispatch(removeFolder(id));
        }
      } catch (err) {
        console.log("Ошибка при создании папки", err);
      }
    },
    [dispatch]
  );

  return { deleteFolder };
};
