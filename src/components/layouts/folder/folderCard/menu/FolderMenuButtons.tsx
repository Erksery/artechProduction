import { LuFolderPen } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { SuccessModal } from "../../../../ui/alert/success/SuccessModal";
import { EditFolderModal } from "../../editFolderModal/EditFolderModal";

export const getFolderMenuButtons = (
  openModal: (modal: JSX.Element) => void,
  closeModal: () => void,
  close: () => void
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
      openModal(<EditFolderModal close={closeModal} />);
      close();
    },
  },
  {
    id: 3,
    title: "Удалить",
    icon: <MdOutlineDelete />,
    red: true,
    event: (e: { preventDefault: () => any }) => {
      e.preventDefault();
      openModal(
        <SuccessModal
          title="Удалить папку?"
          description="Вы действительно хотите удалить данную папку? Это приведет к удалению всех дочерних папок и файлов в них."
          button={{ text: "Удалить", color: "rgb(184, 62, 62)" }}
          event={() => closeModal()}
        />
      );
      close();
    },
  },
];
