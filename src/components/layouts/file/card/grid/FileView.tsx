import styles from "./FileCard.module.scss";
import React, { lazy } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@store/index";
import { toggleSelectedFile } from "@store/slices/files";

import { fileTypes } from "@config/fileTypes";
import { imageTypes } from "@config/imageTypes";

import { CheckBox } from "@components/ui/svg/checkbox/CheckBox";
import { EmptyCheckBox } from "@components/ui/svg/checkbox/EmptyCheckBox";

import { FileCardProps } from "./FileCard";
import { FileEditing } from "./FileEditing";

import { useDrag } from "react-dnd";
import { useFileCardLogic } from "../hooks/useFileCardLogic";
import { useScrollTo } from "../hooks/useScrollTo";

const FileImage = lazy(() => import("../../image/FileImage"));

export const FileView = React.memo(({ file, i }: FileCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    activeEditMode,
    fileSelected,
    activeFolder,
    fileSvg,
    fileSize,
    searchActive,
  } = useFileCardLogic(file);

  useScrollTo();

  const [{ isDragging }, drag] = useDrag({
    type: "FILE",
    item: { file },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      id={`file-${file?.id}`}
      onClick={() => activeEditMode && dispatch(toggleSelectedFile(file.id))}
      className={`${styles.card} ${
        fileSelected || searchActive ? styles.selected : ""
      }`}
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
            className={`${activeEditMode && styles.opacity}`}
          />
        ) : (
          <div className={styles.fileIcon}>
            {fileSvg ? fileSvg?.svg : fileTypes[0]?.svg}
          </div>
        )}

        <div className={styles.infoContainer}>
          <div className={styles.check}>
            {activeEditMode &&
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
});
