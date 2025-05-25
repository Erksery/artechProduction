import { LuFolderPen } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { GoInfo } from "react-icons/go";
import { LuClipboardPaste } from "react-icons/lu";

import { ModalState } from "@hooks/modal/useModal";
import { FolderData } from "@interfaces/folder";

export const getFolderMenuButtons = (
  id: string,
  folder: FolderData,
  openModal: (modal: ModalState) => void,
  closeModal: () => void,
  close: () => void,
  deleteFolder: (id: string) => void,
  pasteFilesToFolder: (folderId: string | undefined) => void
) => [
  {
    id: 1,
    title: "Открыть",
    icon: <GrView />,
    red: false,
    event: () => close(),
  },
  {
    id: 2,
    title: "Редактировать",
    icon: <LuFolderPen />,
    red: false,
    event: (e: { preventDefault: () => any }) => {
      e.preventDefault();
      openModal({
        name: "editFolderModal",
        props: { folder: folder, close: closeModal },
      });
      close();
    },
  },

  {
    id: 3,
    title: "Вставить",
    icon: <LuClipboardPaste />,
    red: false,
    event: () => {
      pasteFilesToFolder(folder.id);
      close();
    },
  },
  {
    id: 4,
    title: "Свойства",
    icon: <GoInfo />,
    red: false,
    event: (e: { preventDefault: () => any }) => {
      e.preventDefault();
      openModal({
        name: "propertiesFolder",
        props: {
          folder: folder,
        },
      });
      close();
    },
  },
  {
    id: 5,
    title: "Удалить",
    icon: <MdOutlineDelete />,
    red: true,
    event: (e: { preventDefault: () => any }) => {
      e.preventDefault();

      openModal({
        name: "success",
        props: {
          title: "Удалить папку?",
          description:
            "Вы действительно хотите удалить данную папку? Это приведет к удалению всех дочерних папок и файлов в них.",
          button: { text: "Удалить", color: "rgb(184, 62, 62)" },
          event: async () => {
            await deleteFolder(id);
            closeModal();
          },
        },
      });
      close();
    },
  },
];
