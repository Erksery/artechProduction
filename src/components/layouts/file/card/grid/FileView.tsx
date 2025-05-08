import styles from "./FileCard.module.scss";
import { lazy, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@store/index";
import { toggleSelectedFile } from "@store/slices/files";

import { useFormat } from "@hooks/useFormat";

import { fileTypes } from "@config/fileTypes";
import { imageTypes } from "@config/imageTypes";

import { CheckBox } from "@components/ui/svg/checkbox/CheckBox";
import { EmptyCheckBox } from "@components/ui/svg/checkbox/EmptyCheckBox";

import { FileCardProps } from "./FileCard";
import { FileEditing } from "./FileEditing";

const FileImage = lazy(() => import("../../image/FileImage"));

export const FileView = ({ file, i }: FileCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const fileSelector = useSelector((state: RootState) => state.files);
  const fileSelected = useSelector((state: RootState) =>
    state.files.selectedFiles.includes(file.id)
  );
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );

  const { formatFileSize } = useFormat();

  const fileSize = useMemo(() => formatFileSize(file.size), [file.size]);

  const fileSvg = useMemo(() => {
    return (
      fileTypes.find((element) => element.mimeType.includes(file.mimeType)) ||
      fileTypes[0]
    );
  }, [file.mimeType]);

  const [{ isDragging }, drag] = useDrag({
    type: "FILE",
    item: { file },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      onClick={() =>
        fileSelector.activeEditMode && dispatch(toggleSelectedFile(file.id))
      }
      className={`${styles.card} ${fileSelected && styles.selected}`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className={styles.fileContainer}>
        {imageTypes.includes(file.mimeType) ? (
          <FileImage
            src={file.name}
            folderId={activeFolder}
            className={`${fileSelector.activeEditMode && styles.opacity}`}
          />
        ) : (
          <div className={styles.fileIcon}>
            {fileSvg ? fileSvg.svg : fileTypes[0].svg}
          </div>
        )}

        <div className={styles.infoContainer}>
          <div className={styles.check}>
            {fileSelector.activeEditMode &&
              (fileSelected ? (
                <CheckBox width={20} height={20} />
              ) : (
                <EmptyCheckBox width={20} height={20} />
              ))}
          </div>
          <div className={styles.sizeContainer}>
            <p>{fileSize}</p>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.type}>
          <span>{file.mimeType}</span>
        </p>
        <div className={styles.menu}>
          <FileEditing file={file} i={i} activeFolder={activeFolder} />
        </div>
      </div>
    </div>
  );
};
