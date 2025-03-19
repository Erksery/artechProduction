import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setFolders } from "../store/slices/folders";
import api from "../api/api";

export const useGetFolders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getFolders = useCallback(async () => {
    try {
      const foldersResData = await api.get("/folders/");

      dispatch(setFolders(foldersResData.data));
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getFolders();
  }, [getFolders]);
};
