import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFiles } from "../store/slices/files";
import { FileData } from "../interfaces/file";
import { AppDispatch } from "../store";
import api from "../api/api";

export const useGetFiles = (id: string | undefined): void => {
  const dispatch = useDispatch<AppDispatch>();

  const getFiles = useCallback(async () => {
    try {
      const filesResData = await api.get<FileData[]>(`/files/folder/${id}`);
      dispatch(setFiles(filesResData.data));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getFiles();
  }, [id, getFiles]);
};
