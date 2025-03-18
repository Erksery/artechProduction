import React, { useState } from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFolderModal.module.scss";
import { Input } from "../../../ui/input/Input";
import { PrivacySelector } from "../selector/PrivacySelector";
import { useCreateFolder } from "./hook/useCreateFolder";

interface AddFolderModal {
  closeModal: () => void;
}

export const AddFolderModal: React.FC<AddFolderModal> = ({ closeModal }) => {
  const [folderName, setFolderName] = useState("");
  const [selectPrivacy, setSelectPrivacy] = useState("Private");

  const { createFolder } = useCreateFolder();

  const handleSuccess = () => {
    createFolder(folderName, true);
    closeModal();
  };

  return (
    <Modal>
      <div className={styles.folderCreateContainer}>
        <Input
          value={folderName}
          onChange={(e: any) => setFolderName(e.target.value)}
          placeholder={"Название"}
        />

        <p>Режим видимости</p>
        <PrivacySelector
          selectPrivacy={selectPrivacy}
          setSelectPrivacy={setSelectPrivacy}
        />
        <div className={styles.buttonsContainer}>
          <button onClick={handleSuccess} disabled={folderName.length === 0}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
