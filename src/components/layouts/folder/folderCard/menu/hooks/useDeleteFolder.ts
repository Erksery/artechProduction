import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../store";
import { removeFolder } from "../../../../../../store/slices/folders";

export const useDeleteFolder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteFolder = useCallback(
    async (id: number | string) => {
      try {
        const response = await axios.delete(`/api/folders/deleteFolder/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(removeFolder(response.data.folderId));
      } catch (err) {
        console.log("Ошибка при создании папки", err);
      }
    },
    [dispatch]
  );

  return { deleteFolder };
};
