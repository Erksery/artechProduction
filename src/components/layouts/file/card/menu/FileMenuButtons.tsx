import { GrView } from "react-icons/gr";
import { LuFolderPen } from "react-icons/lu";
import { MdOutlineDelete, MdOutlineSimCardDownload } from "react-icons/md";

import { FileViewModal } from "../../modals/view/FileViewModal";
import { SuccessModal } from "../../../../ui/alert/success/SuccessModal";
import { AppDispatch } from "../../../../../store";
import { setActiveFile } from "../../../../../store/slices/files";
import { JSX } from "react";
import { FileData } from "../../../../../interfaces/file";

interface ButtonConfig {
  id: number;
  title: string;
  icon: JSX.Element;
  red: boolean;
  event: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const getFileMenuButtons = (
  openModal: (modal: JSX.Element) => void,
  closeModal: () => void,
  downloadFile: (folderId: string, fileName: string) => void,
  close: () => void,
  editMode: () => void,
  activeFile: number,
  fileDelete: (id: string) => Promise<void>,
  dispatch: AppDispatch,
  fileId: string,
  file: FileData,
  folderId: string | undefined
): ButtonConfig[] => [
  {
    id: 1,
    title: "Открыть",
    icon: <GrView />,
    red: false,
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
    red: false,
    event: () => {
      downloadFile(folderId!, file.name);
    },
  },
  {
    id: 3,
    title: "Переименовать",
    icon: <LuFolderPen />,
    red: false,
    event: () => {
      editMode(), close();
    },
  },
  {
    id: 4,
    title: "Удалить",
    icon: <MdOutlineDelete />,
    red: true,
    event: () => {
      openModal(
        <SuccessModal
          title={"Удалить файл?"}
          description={"Вы действительно хотите удалить данный файл?"}
          button={{ text: "Удалить", color: "rgb(184, 62, 62)" }}
          event={() => {
            fileDelete(fileId);
            closeModal();
          }}
        />
      );
      close();
    },
  },
];
