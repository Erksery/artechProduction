import React, { ChangeEvent, useState } from "react";
import styles from "./EditFolderModal.module.scss";
import { Modal } from "../../../../ui/modal/Modal";
import { Input } from "../../../../ui/input/Input";
import { PrivacySelector } from "../../selector/PrivacySelector";

interface EditFolderModalProps {
  close: () => void;
}

export const EditFolderModal: React.FC<EditFolderModalProps> = ({ close }) => {
  const [editFolderData, setEditFolderData] = useState({
    name: "",
    password: "",
    privacy: "Private",
  });

  const handleInputNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFolderData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleInputPasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFolderData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handlePrivacyChange = (privacy: string) => {
    setEditFolderData((prev) => ({
      ...prev,
      privacy: privacy,
    }));
  };

  return (
    <Modal className={styles.modal}>
      <div className={styles.editModal}>
        <Input
          type="text"
          value={editFolderData.name}
          onChange={handleInputNameChange}
          title="Название"
          placeholder="New Folder"
        />
        <Input
          type="password"
          value={editFolderData.password}
          onChange={handleInputPasswordChange}
          title="Пароль"
          placeholder="*********"
        />
        <p>Режим видимости</p>
        <PrivacySelector
          selectPrivacy={editFolderData.privacy}
          setSelectPrivacy={handlePrivacyChange}
        />
        <div className={styles.buttonsContainer}>
          <button onClick={close}>Подтвердить</button>
        </div>
      </div>
    </Modal>
  );
};
