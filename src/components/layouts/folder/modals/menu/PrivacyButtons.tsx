import { PRIVACY_VALUES, PrivacyType } from "../../../../../config/constants";
import { JSX } from "react";
import { BsIncognito } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { LuLink } from "react-icons/lu";

export interface PrivacyButtons {
  id: number;
  title: string;
  name: PrivacyType;
  description: string;
  icon: JSX.Element;
  event: () => void;
}

export const privacyButtons = (
  handlePrivacyChange: (privacy: PrivacyType) => void
): PrivacyButtons[] => [
  {
    id: 1,
    title: "Приватый",
    name: PRIVACY_VALUES.PRIVATE,
    description: "Папка доступна только вам",
    icon: <BsIncognito />,
    event: () => handlePrivacyChange(PRIVACY_VALUES.PRIVATE),
  },
  {
    id: 2,
    title: "Публичный",
    name: PRIVACY_VALUES.PUBLIC,
    description: "Папка доступна всем",
    icon: <GrGroup />,
    event: () => handlePrivacyChange(PRIVACY_VALUES.PUBLIC),
  },

  {
    id: 3,
    title: "По ссылке",
    name: PRIVACY_VALUES.LINK,
    description: "Папка доступна всем у кого есть ссылка",
    icon: <LuLink />,
    event: () => handlePrivacyChange(PRIVACY_VALUES.LINK),
  },
];
