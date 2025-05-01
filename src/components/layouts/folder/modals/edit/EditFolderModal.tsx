import React, { ChangeEvent, useState } from "react";
import styles from "./EditFolderModal.module.scss";
import { Modal } from "../../../../ui/modal/Modal";
import { Input } from "../../../../ui/input/Input";
import { useEditFolder } from "./hooks/useEditFolder";
import { FolderData } from "../../../../../interfaces/folder";
import { PrivacyType, SharingType } from "../../../../../config/constants";
import { MenuContainer } from "../../../../ui/menu/MenuContainer";
import { privacyButtons } from "../menu/PrivacyButtons";
import { PrivacyMenu } from "../menu/PrivacyMenu";
import { TabToggle } from "../../../../ui/tab/TabToggle";
import { sharingButtons } from "./SharingButtons";

interface EditFolderModalProps {
  folder: FolderData;
  close: () => void;
}

export const EditFolderModal: React.FC<EditFolderModalProps> = ({ folder }) => {
  const [editFolderData, setEditFolderData] = useState<{
    name: string;
    privacy: PrivacyType;
    sharingOptions: SharingType;
  }>({
    name: folder.name || "",
    privacy: folder.privacy || "Private",
    sharingOptions: folder.sharingOptions || "Reading",
  });

  const [privacyOpenMenu, setPrivacyOpenMenu] = useState(false);

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

  const handleSharingChange = (sharing: SharingType) => {
    setEditFolderData((prev) => ({
      ...prev,
      sharingOptions: sharing,
    }));
  };

  const privacy = privacyButtons(handlePrivacyChange);
  const sharing = sharingButtons(handleSharingChange);

  const activePrivacy = privacy.find(
    (button) => button.name === editFolderData.privacy
  );
  const activeSharing = sharing.find(
    (button) => button.name === editFolderData.sharingOptions
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
          open={privacyOpenMenu}
          setOpen={setPrivacyOpenMenu}
          element={
            <PrivacyMenu buttons={privacy} activeButton={activePrivacy} />
          }
          position="left"
        >
          <button className={styles.selector}>
            <p>{activePrivacy?.title}</p>
          </button>
        </MenuContainer>
        <p className={styles.title}>Режим доступа</p>
        <TabToggle tabs={sharing} activeButton={activeSharing} />
        <div className={styles.buttonsContainer}>
          <button onClick={() => submitEditFolder(folder.id, editFolderData)}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
