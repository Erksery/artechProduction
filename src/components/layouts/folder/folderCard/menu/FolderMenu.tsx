import styles from "./FolderMenu.module.scss";
import { useModal } from "../../../../../hooks/useModal";
import { SuccessModal } from "../../../../ui/alert/success/SuccessModal";
import { MenuButton } from "../../../../ui/menu/button/MenuButton";
import { EditFolderModal } from "../../editFolderModal/EditFolderModal";
import { LuFolderPen } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";

export const FolderMenu = () => {
  const { openModal, closeModal } = useModal();
  const buttons = [
    {
      id: 1,
      title: "Редактировать",
      icon: <LuFolderPen />,
      event: () => openModal(<EditFolderModal close={closeModal} />),
    },
    {
      id: 2,
      title: "Удалить",
      icon: <MdOutlineDelete />,
      event: () =>
        openModal(
          <SuccessModal
            title={"Удалить папку?"}
            description={
              "Вы действительно хотите удалить данную папку? Это приведет к удалению всех дочерних папок и файлов в них."
            }
            button={{ text: "Удалить", color: "rgb(184, 62, 62)" }}
            event={() => {
              closeModal();
            }}
          />
        ),
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
