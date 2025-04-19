import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store";
import { deleteFile } from "../../../../../../store/slices/files";
import api from "../../../../../../api/api";

export const useDeleteFile = () => {
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );
  const dispatch = useDispatch<AppDispatch>();
  const fileDelete = useCallback(async (fileId: string) => {
    try {
      await api.delete(`/files/folder/${activeFolder}/file/${fileId}`);
      dispatch(deleteFile(fileId));
    } catch (err) {
      console.log("Ошибка при удалении файла");
    }
  }, []);

  return { fileDelete };
};
