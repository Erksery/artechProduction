import styles from "./FolderMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { getFolderMenuButtons } from "./FolderMenuButtons";
import { useDeleteFolder } from "./hooks/useDeleteFolder";
import { FolderData } from "../../../../../interfaces/folder";

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
