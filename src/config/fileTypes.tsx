import { DocSvg } from "../components/ui/svg/DocSvg";
import { UnknownSvg } from "../components/ui/svg/UnknownSvg";
import { XslSvg } from "../components/ui/svg/XslSvg";

export const fileTypes = [
  {
    mimeType: [],
    svg: <UnknownSvg />,
  },
  {
    mimeType: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    svg: <XslSvg />,
  },
  {
    mimeType: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ],
    svg: <DocSvg />,
  },
];
