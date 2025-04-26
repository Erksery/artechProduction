import React, { ChangeEvent, useState } from "react";
import styles from "./EditFolderModal.module.scss";
import { Modal } from "../../../../ui/modal/Modal";
import { Input } from "../../../../ui/input/Input";
import { useEditFolder } from "./hooks/useEditFolder";
import { FolderData } from "../../../../../interfaces/folder";
import { PrivacyType } from "../../../../../config/constants";
import { MenuContainer } from "../../../../ui/menu/MenuContainer";
import { PrivacyMenu } from "./menu/PrivacyMenu";
import { privacyButtons } from "./menu/PrivacyButtons";

interface EditFolderModalProps {
  folder: FolderData;
  close: () => void;
}

export const EditFolderModal: React.FC<EditFolderModalProps> = ({ folder }) => {
  const [editFolderData, setEditFolderData] = useState<{
    name: string;
    privacy: PrivacyType;
  }>({
    name: folder.name || "",
    privacy: folder.privacy || "Private",
  });

  const [openMenu, setOpenMenu] = useState(false);

  const { submitEditFolder } = useEditFolder();

  const handleInputNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFolderData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handlePrivacyChange = (privacy: PrivacyType) => {
    setEditFolderData((prev) => ({
      ...prev,
      privacy: privacy,
    }));
  };

  const buttons = privacyButtons(handlePrivacyChange);
  const activeButton = buttons.find(
    (button) => button.name === editFolderData.privacy
  );

  return (
    <Modal className={styles.modal}>
      <div className={styles.editModal}>
        <Input
          type="text"
          value={editFolderData.name}
          onChange={handleInputNameChange}
          title="Название"
          placeholder={folder.name}
        />

        <p className={styles.title}>Режим видимости</p>
        <MenuContainer
          open={openMenu}
          setOpen={setOpenMenu}
          element={
            <PrivacyMenu buttons={buttons} activeButton={activeButton} />
          }
          position="left"
        >
          <button className={styles.selector}>
            <p>{activeButton?.title}</p>
          </button>
        </MenuContainer>
        <div className={styles.buttonsContainer}>
          <button onClick={() => submitEditFolder(folder.id, editFolderData)}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
