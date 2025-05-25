import { handleApiError } from "@utils/toast/handleApiError";
import { FaRegCopy } from "react-icons/fa6";
import { LuClipboardPaste } from "react-icons/lu";
import { MdOutlineSimCardDownload } from "react-icons/md";

export interface ButtonProps {
  folderId: string | undefined;
  pasteFilesToFolder: (folderId: string) => void;
  copyFiles: () => void;
}

export const toolsButtons = ({
  folderId,
  pasteFilesToFolder,
  copyFiles,
}: ButtonProps) => [
  {
    id: 1,
    title: "Копировать",
    icon: <FaRegCopy />,
    event: () => copyFiles(),
  },
  {
    id: 2,
    title: "Вставить",
    icon: <LuClipboardPaste />,
    event: () => {
      if (folderId) {
        pasteFilesToFolder(folderId);
      } else {
        handleApiError("folderId отсутствует, вставка отменена");
      }
    },
  },
  {
    id: 3,
    title: "Скачать",
    icon: <MdOutlineSimCardDownload />,
    event: () => console.log("1"),
  },
];
