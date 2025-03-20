import React from "react";
import styles from "./FileMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { getFileMenuButtons } from "./FileMenuButtons";
import { useDeleteFile } from "./hooks/useDeleteFile";

interface FileMenuProps {
  fileId: string;
  activeFile: number;
  close: () => void;
}
export const FileMenu: React.FC<FileMenuProps> = ({
  fileId,
  activeFile,
  close,
}) => {
  const { openModal, closeModal } = useModal();
  const { fileDelete } = useDeleteFile();
  const dispatch = useDispatch<AppDispatch>();
  const buttons = getFileMenuButtons(
    openModal,
    closeModal,
    close,
    activeFile,
    fileDelete,
    dispatch,
    fileId
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
