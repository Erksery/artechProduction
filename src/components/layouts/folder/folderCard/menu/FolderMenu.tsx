import styles from "./FolderMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { getFolderMenuButtons } from "./FolderMenuButtons";

interface FolderMenuProps {
  close: () => void;
}

export const FolderMenu: React.FC<FolderMenuProps> = ({ close }) => {
  const { openModal, closeModal } = useModal();
  const buttons = getFolderMenuButtons(openModal, closeModal, close);

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
