import { JSX } from "react";
import { DocSvg } from "../../../../ui/svg/mimeTypes/DocSvg";
import { UnknownSvg } from "../../../../ui/svg/mimeTypes/UnknownSvg";
import { XmlSvg } from "../../../../ui/svg/mimeTypes/XmlSvg";

export interface FileCategoriesTypes {
  id: number;
  value: string;
  title: string;
  icon: JSX.Element;
}

export const fileCategories = [
  { id: 1, value: "", title: "Все", icon: <UnknownSvg /> },
  { id: 2, value: "image", title: "Картинки", icon: <XmlSvg /> },
  { id: 3, value: "application", title: "Документы", icon: <DocSvg /> },
];
