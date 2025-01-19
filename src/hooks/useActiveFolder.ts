import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useCallback, useEffect } from "react";
import { setActiveFolder } from "../store/slices/folders";

export const useActiveFolder = (id: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectActiveFolder = useCallback(() => {
    try {
      dispatch(setActiveFolder(id));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    selectActiveFolder();
  }, [id]);
};
