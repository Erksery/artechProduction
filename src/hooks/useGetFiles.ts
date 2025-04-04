import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFiles } from "../store/slices/files";
import { FileData } from "../interfaces/file";
import { AppDispatch } from "../store";
import api from "../api/api";

export const useGetFiles = (
  id: string | undefined,
  filter: string,
  order: string
): void => {
  const dispatch = useDispatch<AppDispatch>();

  const getFiles = useCallback(
    async (filter: string, order: string) => {
      try {
        const filesResData = await api.get<FileData[]>(`/files/folder/${id}`, {
          params: {
            filter: filter,
            order: order,
          },
        });
        dispatch(setFiles(filesResData.data));
      } catch (err) {
        console.log(err);
      }
    },
    [id]
  );

  useEffect(() => {
    getFiles(filter, order);
  }, [id, getFiles]);
};
