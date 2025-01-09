import React from "react";
import styles from "./FileMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { SuccessModal } from "../../../../ui/alert/success/SuccessModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { LuFolderPen } from "react-icons/lu";
import { MdOutlineDelete, MdOutlineSimCardDownload } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FileViewModal } from "../../modals/fileViewModal/FileViewModal";

interface FileMenuProps {
  file: number;
  close: () => void;
}
export const FileMenu: React.FC<FileMenuProps> = ({ file, close }) => {
  const { openModal, closeModal } = useModal();
  const buttons = [
    {
      id: 1,
      title: "Открыть",
      icon: <GrView />,
      event: () => {
        openModal(<FileViewModal file={file} />);
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
