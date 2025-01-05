import React, { useState } from "react";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./AddFolderModal.module.scss";
import { Input } from "../../../ui/input/Input";

interface AddFolderModal {
  closeModal: () => void;
}

export const AddFolderModal: React.FC<AddFolderModal> = ({ closeModal }) => {
  const [folderName, setFolderName] = useState("");
  const [selectPrivacy, setSelectPrivacy] = useState(1);
  const privacy = [
    {
      id: 1,
      title: "Приватный",
      description:
        "Папка будет видна только вам. Никто, кроме вас, не сможет получить к ней доступ.",
      event: () => setSelectPrivacy(1),
    },
    {
      id: 2,
      title: "Публичный",
      description:
        "Папка будет доступна всем. Редактировать могут создатель и администрация. Подходит для совместного использования.",
      event: () => setSelectPrivacy(2),
    },
  ];
  return (
    <Modal>
      <div className={styles.folderCreateContainer}>
        <Input
          value={folderName}
          onChange={(e: any) => setFolderName(e.target.value)}
          placeholder={"Название"}
        />

        <p>Режим видимости</p>
        <div className={styles.selector}>
          {privacy.map((card) => (
            <div
              key={card.id}
              onClick={card.event}
              className={`${styles.card} ${
                selectPrivacy === card.id ? styles.active : ""
              }`}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={closeModal} disabled={folderName.length === 0}>
            Подтвердить
          </button>
        </div>
      </div>
    </Modal>
  );
};
