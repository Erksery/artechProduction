import { MpegSvg } from "@components/ui/svg/mimeTypes/MpegSvg";
import { DocSvg } from "../components/ui/svg/mimeTypes/DocSvg";
import { UnknownSvg } from "../components/ui/svg/mimeTypes/UnknownSvg";
import { XslSvg } from "../components/ui/svg/mimeTypes/XslSvg";
import { JpgSvg } from "@components/ui/svg/mimeTypes/JpgSvg";
import { Mp4Svg } from "@components/ui/svg/mimeTypes/Mp4Svg";
import { TxtSvg } from "@components/ui/svg/mimeTypes/TxtSvg";
import { HtmlSvg } from "@components/ui/svg/mimeTypes/HtmlSvg";
import { ScriptSvg } from "@components/ui/svg/mimeTypes/ScriptSvg";

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
  { title: "Script", mimeType: ["text/javascript"], svg: <ScriptSvg /> },
  { title: "Mpeg", mimeType: ["audio/mpeg"], svg: <MpegSvg /> },
  { title: "Jpeg", mimeType: ["image/jpeg"], svg: <JpgSvg /> },
  { title: "Mp4", mimeType: ["video/mp4"], svg: <Mp4Svg /> },
  { title: "Text", mimeType: ["text/plain"], svg: <TxtSvg /> },
  { title: "Html", mimeType: ["text/html"], svg: <HtmlSvg /> },
];
