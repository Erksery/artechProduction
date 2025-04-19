import { DocSvg } from "../components/ui/svg/mimeTypes/DocSvg";
import { UnknownSvg } from "../components/ui/svg/mimeTypes/UnknownSvg";
import { XslSvg } from "../components/ui/svg/mimeTypes/XslSvg";

export const fileTypes = [
  {
    title: "Unknown",
    mimeType: [],
    svg: <UnknownSvg />,
  },
  {
    title: "Xml",
    mimeType: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    svg: <XslSvg />,
  },
  {
    title: "Docx",
    mimeType: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ],
    svg: <DocSvg />,
  },
];
