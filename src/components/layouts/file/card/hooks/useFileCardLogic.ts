import { useFormat } from "@hooks/useFormat";
import { FileData } from "@interfaces/file";
import { AppDispatch, RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { useSvgType } from "./useSvgType";
import { useEffect } from "react";
import { clearSearchFile } from "@store/slices/files";

export const useFileCardLogic = (file: FileData) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFiles = useSelector(
    (state: RootState) => state.files.selectedFiles
  );
  const activeEditMode = useSelector(
    (state: RootState) => state.files.activeEditMode
  );
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );
  const searchFile = useSelector((state: RootState) => state.files.searchFile);

  const fileSelected = selectedFiles.includes(file.id);
  const searchActive = searchFile === file.id;
  const { formatFileSize, formatFileDate } = useFormat();
  const { fileSvg } = useSvgType(file.mimeType);

  const fileSize = formatFileSize(file.size);
  const fileCreateDate = formatFileDate(file.createdAt);

  useEffect(() => {
    if (searchActive) {
      const timer = setTimeout(() => {
        dispatch(clearSearchFile());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, searchActive]);

  return {
    activeEditMode,
    activeFolder,
    searchActive,
    fileSelected,
    fileSvg,
    fileSize,
    fileCreateDate,
  };
};
