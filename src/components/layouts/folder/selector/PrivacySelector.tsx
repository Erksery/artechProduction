import React from "react";
import styles from "./PrivacySelector.module.scss";

interface PrivacySelectorProps {
  selectPrivacy: string;
  setSelectPrivacy: (privacy: string) => void;
}

export const PrivacySelector: React.FC<PrivacySelectorProps> = ({
  selectPrivacy,
  setSelectPrivacy,
}) => {
  const privacyOptions = [
    {
      id: 1,
      title: "Приватный",
      description:
        "Папка будет видна только вам. Никто, кроме вас, не сможет получить к ней доступ.",
      privacy: "Private",
      event: () => setSelectPrivacy("Private"),
    },
    {
      id: 2,
      title: "Публичный",
      description:
        "Папка будет доступна всем. Редактировать могут создатель и администрация. Подходит для совместного использования.",
      privacy: "Public",
      event: () => setSelectPrivacy("Public"),
    },
  ];

  return (
    <div className={styles.selector}>
      {privacyOptions.map((card) => (
        <div
          key={card.id}
          onClick={card.event}
          className={`${styles.card} ${
            selectPrivacy === card.privacy ? styles.active : ""
          }`}
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};
