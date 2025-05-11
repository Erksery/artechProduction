import styles from "./FolderMenu.module.scss";

import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { getFolderMenuButtons } from "./FolderMenuButtons";
import { useDeleteFolder } from "./hooks/useDeleteFolder";
import { FolderData } from "../../../../../interfaces/folder";
import { useModal } from "@hooks/modal/useModal";

interface FolderMenuProps {
  id: string;
  folder: FolderData;
  close: () => void;
}

export const FolderMenu: React.FC<FolderMenuProps> = ({
  id,
  folder,
  close,
}) => {
  const { openModal, closeModal } = useModal();
  const { deleteFolder } = useDeleteFolder();
  const buttons = getFolderMenuButtons(
    id,
    folder,
    openModal,
    closeModal,
    close,
    deleteFolder
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
