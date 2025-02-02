import styles from "./AddModal.module.scss";
import { FiFilePlus } from "react-icons/fi";
import { MdOutlineFolderCopy } from "react-icons/md";
import { motion } from "framer-motion";
import { useModal } from "../../../../../hooks/useModal";
import { AddFileModal } from "../../../file/addFileModal/AddFileModal";
import { AddFolderModal } from "../../../folder/addFolderModal/AddFolderModal";

interface AddModalProps {
  setOpen: (isOpen: boolean) => void;
}

export const AddModal: React.FC<AddModalProps> = ({ setOpen }) => {
  const { openModal, closeModal } = useModal();

  const buttons = [
    {
      id: 1,
      title: "Загрузить файл",
      description: "Создает файл в папке",
      icon: <FiFilePlus />,
      event: () => {
        openModal(<AddFileModal closeModal={closeModal} />);
        setOpen(false);
      },
    },
    {
      id: 2,
      title: "Создать папку",
      description: "Создает папку в директории",
      icon: <MdOutlineFolderCopy />,
      event: () => {
        openModal(<AddFolderModal closeModal={closeModal} />);
        setOpen(false);
      },
    },
  ];

  const buttonVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.25,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div className={styles.addModal} initial="hidden" animate="visible">
      {buttons.map((button, index) => (
        <motion.button
          onClick={button.event}
          key={button.id}
          custom={index}
          whileHover={{
            scale: 0.9,
          }}
          whileTap={{
            scale: 0.85,
          }}
          className={styles.button}
        >
          {button.icon}
          <div className={styles.info}>
            <p>{button.title}</p>
            <label>{button.description}</label>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
