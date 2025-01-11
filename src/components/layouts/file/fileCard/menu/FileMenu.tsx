import React from "react";
import styles from "./FileMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { SuccessModal } from "../../../../ui/alert/success/SuccessModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { LuFolderPen } from "react-icons/lu";
import { MdOutlineDelete, MdOutlineSimCardDownload } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FileViewModal } from "../../modals/fileViewModal/FileViewModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { setActiveFile } from "../../../../../store/slices/files";

interface FileMenuProps {
  activeFile: number;
  close: () => void;
}
export const FileMenu: React.FC<FileMenuProps> = ({ activeFile, close }) => {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const buttons = [
    {
      id: 1,
      title: "Открыть",
      icon: <GrView />,
      event: () => {
        dispatch(setActiveFile(activeFile));
        openModal(<FileViewModal activeFile={activeFile} />);
        close();
      },
    },
    {
      id: 2,
      title: "Скачать",
      icon: <MdOutlineSimCardDownload />,
      event: () => {
        console.log("1"), close();
      },
    },
    {
      id: 3,
      title: "Редактировать",
      icon: <LuFolderPen />,
      event: () => {
        console.log("1"), close();
      },
    },
    {
      id: 4,
      title: "Удалить",
      icon: <MdOutlineDelete />,
      event: () => {
        openModal(
          <SuccessModal
            title={"Удалить файл?"}
            description={"Вы действительно хотите удалить данный файл?"}
            button={{ text: "Удалить", color: "rgb(184, 62, 62)" }}
            event={() => {
              closeModal();
            }}
          />
        );
        close();
      },
    },
  ];
  return (
    <div className={styles.menu}>
      {buttons.map((button) => (
        <MenuButton
          key={button.id}
          event={button.event}
          title={button.title}
          icon={button.icon}
          height={40}
        />
      ))}
    </div>
  );
};
