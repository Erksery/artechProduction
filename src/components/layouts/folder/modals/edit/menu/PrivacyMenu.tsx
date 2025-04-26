import styles from "./PrivacyMenu.module.scss";
import { PrivacyButtons } from "./PrivacyButtons";
import { MenuButton } from "../../../../../ui/menu/button/MenuButton";

interface Props {
  buttons: PrivacyButtons[];
  activeButton: PrivacyButtons | undefined;
}

export const PrivacyMenu = ({ buttons, activeButton }: Props) => {
  return (
    <div className={styles.selector}>
      {buttons.map((button) => (
        <MenuButton
          title={button.title}
          event={button.event}
          icon={button.icon}
          description={button.description}
          height={60}
          className={`${activeButton?.id === button.id && styles.active}`}
        />
      ))}
    </div>
  );
};
