import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useCallback } from "react";
import { setActiveFile } from "@store/slices/files";

export const useActiveFile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectActiveFile = useCallback((id: string | undefined) => {
    try {
      dispatch(setActiveFile(id));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { selectActiveFile };
};
