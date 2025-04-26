import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "../store/slices/files";
import { FileData } from "../interfaces/file";
import { AppDispatch, RootState } from "../store";
import api from "../api/api";
import { handleApiError } from "../utils/toast/handleApiError";

export const useGetFiles = (id: string | undefined) => {
  const [fileLoading, setFileLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const file = useSelector((state: RootState) => state.files);

  const getFiles = useCallback(async () => {
    setFileLoading(true);
    try {
      dispatch(setFiles([]));
      const filesResData = await api.get<FileData[]>(`/files/folder/${id}`, {
        params: {
          filter: `${file.filter.name}=${file.filter.value}`,
          order: `${file.order.name}=${file.order.value}`,
        },
      });
      console.log(filesResData);
      dispatch(setFiles(filesResData.data));
    } catch (err) {
      handleApiError(err, "Не удалось загрузить файлы");
    } finally {
      setFileLoading(false);
    }
  }, [id, file.filter, file.order]);

  useEffect(() => {
    getFiles();
  }, [id, file.filter, file.order, getFiles]);

  return { fileLoading };
};
