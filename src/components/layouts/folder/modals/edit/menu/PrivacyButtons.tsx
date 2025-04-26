import { FaCheck } from "react-icons/fa6";
import {
  PRIVACY_VALUES,
  PrivacyType,
} from "../../../../../../config/constants";
import { JSX } from "react";

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
    icon: <FaCheck />,
    event: () => handlePrivacyChange(PRIVACY_VALUES.PRIVATE),
  },
  {
    id: 2,
    title: "Публичный",
    name: PRIVACY_VALUES.PUBLIC,
    description: "Папка доступна всем",
    icon: <FaCheck />,
    event: () => handlePrivacyChange(PRIVACY_VALUES.PUBLIC),
  },

  {
    id: 3,
    title: "По ссылке",
    name: PRIVACY_VALUES.LINK,
    description: "Папка доступна всем у кого есть ссылка",
    icon: <FaCheck />,
    event: () => handlePrivacyChange(PRIVACY_VALUES.LINK),
  },
];
