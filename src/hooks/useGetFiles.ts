import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFiles } from "../store/slices/files";
import { FileData } from "../interfaces/file";
import { AppDispatch } from "../store";

interface useGetFilesProps {
  id: string | undefined;
}

export const useGetFiles = ({ id }: useGetFilesProps): void => {
  const dispatch = useDispatch<AppDispatch>();

  const getFiles = useCallback(async () => {
    try {
      //const authToken = localStorage.getItem("token");
      const filesResData = await axios.get<FileData[]>("/api/files/getFiles", {
        params: { id },

        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJMb2dpbiI6IkVya3NlciIsInVzZXJSb2xlIjoiVXNlciIsImlhdCI6MTczMjcwNjU2M30.JriJ68F1s-fFUYVHqQG9JITjXsmzTLC_KOu19IGue_s`,
        },
      });
      dispatch(setFiles(filesResData.data));
      //console.log(filesResData.data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getFiles();
  }, [id, getFiles]);
};
