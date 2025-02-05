import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { addFolder } from "../../../../../store/slices/folders";

export const useCreateFolder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.folders.activeFolder);
  const apiUrl = "/api/folders/createFolder";

  const createFolder = useCallback(
    async (folderName?: string, parent?: boolean) => {
      try {
        const url = parent ? apiUrl : `${apiUrl}/${id}`;
        const response = await axios.post(
          url,
          { name: folderName ? folderName : "Новая папка" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(addFolder([response.data.folder]));
      } catch (err) {
        console.log("Ошибка при создании папки", err);
      }
    },
    [id, dispatch]
  );

  return { createFolder };
};
