import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setFolders } from "../store/slices/folders";
import api from "../api/api";
import { handleApiError } from "../utils/toast/handleApiError";

export const useGetFolders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getFolders = useCallback(async () => {
    try {
      const foldersResData = await api.get("/folders/");

      dispatch(setFolders(foldersResData.data));
    } catch (err) {
      handleApiError(err, "Не удалось загрузить папки");
    }
  }, []);
  useEffect(() => {
    getFolders();
  }, [getFolders]);
};
