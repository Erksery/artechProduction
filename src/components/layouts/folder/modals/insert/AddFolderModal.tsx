import React, { useState } from "react";
import { Modal } from "../../../../ui/modal/Modal";
import styles from "./AddFolderModal.module.scss";
import { Input } from "../../../../ui/input/Input";
import { useCreateFolder } from "./hook/useCreateFolder";
import { PrivacyMenu } from "../menu/PrivacyMenu";
import { privacyButtons } from "../menu/PrivacyButtons";
import { PrivacyType } from "../../../../../config/constants";
import { MenuContainer } from "../../../../ui/menu/MenuContainer";

interface AddFolderModal {
  closeModal: () => void;
}

export const AddFolderModal: React.FC<AddFolderModal> = ({ closeModal }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectPrivacy, setSelectPrivacy] = useState<{
    name: string;
    privacy: PrivacyType;
  }>({
    name: "",
    privacy: "Private",
  });
  const { createFolder } = useCreateFolder();

  const handleSuccess = () => {
    createFolder(folderName, true);
    closeModal();
  };

  const handlePrivacyChange = (privacy: PrivacyType) => {
    setSelectPrivacy((prev) => ({
      ...prev,
      privacy: privacy,
    }));
  };

  const buttons = privacyButtons(handlePrivacyChange);
  const activeButton = buttons.find(
    (button) => button.name === selectPrivacy.privacy
  );

  return (
    <Modal className={styles.modal}>
      <div className={styles.folderCreateContainer}>
        <Input
          value={folderName}
          onChange={(e: any) => setFolderName(e.target.value)}
          placeholder={"Название"}
        />

        <p>Режим видимости</p>
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
          <button onClick={handleSuccess} disabled={folderName.length === 0}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
