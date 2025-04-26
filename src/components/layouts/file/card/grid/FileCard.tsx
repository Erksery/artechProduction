import React, { lazy, useRef, useState } from "react";
import styles from "./FileCard.module.scss";
import { AnimatePresence, motion } from "framer-motion";

import { IoMdMore } from "react-icons/io";
import { MenuContainer } from "../../../../ui/menu/MenuContainer";
import { FileMenu } from "../menu/FileMenu";
import { FileData } from "../../../../../interfaces/file";
import { FileSkeleton } from "./FileSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { fileTypes } from "../../../../../config/fileTypes";
import { imageTypes } from "../../../../../config/imageTypes";
import { useDrag } from "react-dnd";
import { useEditFile } from "../../../../../hooks/useEditFile";
import { useFormat } from "../../../../../hooks/useFormat";
import { EmptyCheckBox } from "../../../../ui/svg/checkbox/EmptyCheckBox";
import { CheckBox } from "../../../../ui/svg/checkbox/CheckBox";
import { toggleSelectedFile } from "../../../../../store/slices/files";
import { useObserver } from "../../../../../hooks/useObserver";

import { FaCheck } from "react-icons/fa6";

const FileImage = lazy(() => import("../../image/FileImage"));

interface FileCardProps {
  file: FileData;
  i: number;
}

export const FileCard: React.FC<FileCardProps> = ({ file, i }) => {
  const [fileMenu, setFileMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );
  const fileSelector = useSelector((state: RootState) => state.files);

  const { editMode, editing, inputRef, setEditValue, submitEditFile } =
    useEditFile();
  const { formatFileSize } = useFormat();

  const fileSelected = fileSelector.selectedFiles.includes(file.id);

  const fileSvg = fileTypes.find((element) =>
    element.mimeType.includes(file.mimeType)
  );

  const closeMenu = () => {
    setFileMenu(false);
  };
  const [{ isDragging }, drag] = useDrag({
    type: "FILE",
    item: { file },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { isVisible } = useObserver(ref);

  return (
    <AnimatePresence>
      <motion.div ref={ref} exit={{ scale: 0.6 }} draggable={false}>
        {isVisible ? (
          <motion.div
            onClick={() =>
              fileSelector.activeEditMode &&
              dispatch(toggleSelectedFile(file.id))
            }
            className={`${styles.card} ${fileSelected && styles.selected}`}
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
            }}
            animate={{ scale: isDragging ? 0.9 : 1 }}
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
                  <p>{formatFileSize(file.size)}</p>
                </div>
              </div>
            </div>

            <div className={styles.info}>
              <p className={styles.type}>
                <span>{file.mimeType}</span>
              </p>
              <div className={styles.menu}>
                {editing ? (
                  <form
                    onSubmit={(e) => submitEditFile(e, file.folderId, file.id)}
                    className={styles.editContainer}
                  >
                    <input
                      ref={inputRef}
                      defaultValue={file.originalFilename}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={(e) => {
                        const nextFocused = e.relatedTarget;

                        if (!nextFocused || nextFocused.tagName !== "BUTTON") {
                          editMode();
                        }
                      }}
                    />
                    <button type="submit">
                      <FaCheck />
                    </button>
                  </form>
                ) : (
                  <>
                    <p className={styles.name}>{file.originalFilename}</p>
                    <MenuContainer
                      element={
                        <FileMenu
                          fileId={file.id}
                          activeFile={i}
                          close={closeMenu}
                          editMode={editMode}
                        />
                      }
                      open={fileMenu}
                      setOpen={setFileMenu}
                      blur={true}
                    >
                      <button className={styles.menuButton}>
                        <IoMdMore />
                      </button>
                    </MenuContainer>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <FileSkeleton />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
