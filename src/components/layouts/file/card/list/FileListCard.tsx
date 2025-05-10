import { useFileCardLogic } from "../hooks/useFileCardlogic";
import { FileData } from "@interfaces/file";
import { imageTypes } from "@config/imageTypes";
import { fileTypes } from "@config/fileTypes";
import styles from "./FileListCard.module.scss";
import FileImage from "../../image/FileImage";

interface Props {
  file: FileData;
}

export const FileListCard = ({ file }: Props) => {
  const { activeFolder, fileSvg, fileSize, fileCreateDate } =
    useFileCardLogic(file);

  return (
    <div className={styles.card}>
      <div className={styles.view}>
        {imageTypes.includes(file.mimeType) ? (
          <FileImage
            src={file.name}
            folderId={activeFolder}
            className={styles.image}
          />
        ) : (
          <div className={styles.fileIcon}>
            {fileSvg ? fileSvg.svg : fileTypes[0].svg}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{file.originalFilename}</p>
        <p className={styles.size}>{fileSize}</p>
        <p className={styles.size}>{fileCreateDate}</p>
      </div>
    </div>
  );
};
