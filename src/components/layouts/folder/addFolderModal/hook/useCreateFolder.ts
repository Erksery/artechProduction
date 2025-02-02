import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { addFolder } from "../../../../../store/slices/folders";

export const useCreateFolder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.folders.activeFolder);

  const createFolder = useCallback(async (folderName: string) => {
    try {
      const response = await axios.post(
        `/api/folders/createFolder/${id}`,
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
  }, []);

  return { createFolder };
};
