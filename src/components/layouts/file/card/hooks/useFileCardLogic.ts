import { useFormat } from "@hooks/useFormat";
import { FileData } from "@interfaces/file";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { useSvgType } from "./useSvgType";

export const useFileCardLogic = (file: FileData) => {
  const selectedFiles = useSelector(
    (state: RootState) => state.files.selectedFiles
  );
  const activeEditMode = useSelector(
    (state: RootState) => state.files.activeEditMode
  );
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );
  const activeFile = useSelector((state: RootState) => state.files.activeFile);

  const fileSelected = selectedFiles.includes(file.id);
  const searchActive = activeFile === file.id;
  const { formatFileSize, formatFileDate } = useFormat();
  const { fileSvg } = useSvgType(file.mimeType);

  const fileSize = formatFileSize(file.size);
  const fileCreateDate = formatFileDate(file.createdAt);

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
