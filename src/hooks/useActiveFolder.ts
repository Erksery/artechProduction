import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { setActiveFolder } from "../store/slices/folders";

export const useActiveFolder = (id: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    dispatch(setActiveFolder(id));
  }, [dispatch]);
};
