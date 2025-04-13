import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "../store/slices/files";
import { FileData } from "../interfaces/file";
import { AppDispatch, RootState } from "../store";
import api from "../api/api";

export const useGetFiles = (id: string | undefined): void => {
  const dispatch = useDispatch<AppDispatch>();
  const file = useSelector((state: RootState) => state.files);

  const getFiles = useCallback(async () => {
    try {
      dispatch(setFiles([]));
      const filesResData = await api.get<FileData[]>(`/files/folder/${id}`, {
        params: {
          filter: `${file.filter.name}=${file.filter.value}`,
          order: `${file.order.name}=${file.order.value}`,
        },
      });
      dispatch(setFiles(filesResData.data));
    } catch (err) {
      console.log(err);
    }
  }, [id, file.filter]);

  useEffect(() => {
    getFiles();
  }, [id, file.filter, getFiles]);
};
