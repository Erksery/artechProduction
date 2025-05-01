import React from "react";
import styles from "./FileMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { getFileMenuButtons } from "./FileMenuButtons";
import { useDeleteFile } from "./hooks/useDeleteFile";
import { useDownload } from "../../../../../hooks/useDownload";
import { FileData } from "../../../../../interfaces/file";

interface FileMenuProps {
  file: FileData;
  fileId: string;
  folderId: string | undefined;
  activeFile: number;
  close: () => void;
  editMode: () => void;
}
export const FileMenu: React.FC<FileMenuProps> = ({
  file,
  fileId,
  activeFile,
  close,
  editMode,
  folderId,
}) => {
  const { openModal, closeModal } = useModal();
  const { fileDelete } = useDeleteFile();
  const { downloadFile } = useDownload();
  const dispatch = useDispatch<AppDispatch>();
  const buttons = getFileMenuButtons(
    openModal,
    closeModal,
    downloadFile,
    close,
    editMode,
    activeFile,
    fileDelete,
    dispatch,
    fileId,
    file,
    folderId
  );

  return (
    <div className={styles.menu}>
      {buttons.map((button) => (
        <MenuButton
          key={button.id}
          event={button.event}
          title={button.title}
          icon={button.icon}
          height={40}
          red={button.red}
        />
      ))}
    </div>
  );
};
