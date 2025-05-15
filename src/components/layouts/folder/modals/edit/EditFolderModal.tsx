import React, { ChangeEvent, useState } from "react";
import styles from "./EditFolderModal.module.scss";
import { Modal } from "../../../../ui/modal/Modal";
import { Input } from "../../../../ui/input/Input";
import { useEditFolder } from "./hooks/useEditFolder";
import { FolderData } from "../../../../../interfaces/folder";
import {
  PRIVACY_VALUES,
  PrivacyType,
  SharingType,
} from "../../../../../config/constants";
import { MenuContainer } from "../../../../ui/menu/container/MenuContainer";
import { privacyButtons } from "../menu/PrivacyButtons";
import { PrivacyMenu } from "../menu/PrivacyMenu";
import { TabToggle } from "../../../../ui/tab/TabToggle";
import { sharingButtons } from "./SharingButtons";
import { useModal } from "@hooks/modal/useModal";
import { handleApiSuccess } from "@utils/toast/handleApiSuccess";

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
  const { closeModal } = useModal();

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

  const handleCopy = async () => {
    try {
      const copyText = `${window.location.origin}/shared/folder/${folder.id}`;

      await navigator.clipboard.writeText(copyText);
      handleApiSuccess(
        "Скопировано в буфер обмена",
        "Ссылка успешно скопирована",
        true
      );
    } catch (err) {
      console.log(err);
    }
  };

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
          <div className={styles.linkContainer}>
            {editFolderData.privacy === PRIVACY_VALUES.LINK && (
              <button onClick={handleCopy} className={styles.linkButton}>
                Скопировать ссылку
              </button>
            )}
          </div>
          <button
            onClick={() => {
              submitEditFolder(folder.id, editFolderData), closeModal();
            }}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
