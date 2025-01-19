import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setFolders } from "../store/slices/folders";

export const useGetFolders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getFolders = useCallback(async () => {
    try {
      const foldersResData = await axios.get("/api/folders/getFolders", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJMb2dpbiI6IkVya3NlciIsInVzZXJSb2xlIjoiVXNlciIsImlhdCI6MTczMjcwNjU2M30.JriJ68F1s-fFUYVHqQG9JITjXsmzTLC_KOu19IGue_s`,
        },
      });

      dispatch(setFolders(foldersResData.data));
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getFolders();
  }, [getFolders]);
};
