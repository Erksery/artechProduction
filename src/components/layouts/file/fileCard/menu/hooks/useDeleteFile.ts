import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../store";
import { deleteFile } from "../../../../../../store/slices/files";

export const useDeleteFile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileDelete = useCallback(async (id: number | string) => {
    try {
      const response = await axios.delete(`/api/files/deleteFile/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      dispatch(deleteFile(Number(response.data.fileId)));
    } catch (err) {
      console.log("Ошибка при удалении файла");
    }
  }, []);

  return { fileDelete };
};
