import React, { useEffect, useRef, useState } from "react";
import styles from "./FileCard.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FileImage } from "../fileImage/FileImage";
import { IoMdMore } from "react-icons/io";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FileMenu } from "./menu/FileMenu";
import { FileData } from "../../../../interfaces/file";
import { FileSkeleton } from "./FileSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fileTypes } from "../../../../config/fileTypes";
import { imageTypes } from "../../../../config/imageTypes";
import { useDrag } from "react-dnd";
import { useEditFile } from "../../../../hooks/useEditFile";

interface FileCardProps {
  file: FileData;
  i: number;
  selected: string[];
  addSelectedFile: (file: string) => void;
  deleteSelectedFile: (file: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  i,
  selected,
  addSelectedFile,
  deleteSelectedFile,
}) => {
  const [fileMenu, setFileMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );

  const { editMode, editing, inputRef, setEditValue, submitEditFile } =
    useEditFile();

  const closeMenu = () => {
    setFileMenu(false);
  };

  const fileSelected = selected.includes(file.id);

  const fileSvg = fileTypes.find((element) =>
    element.mimeType.includes(file.mimeType)
  );

  const [{ isDragging }, drag] = useDrag({
    type: "FILE",
    item: { file },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div ref={ref} exit={{ scale: 0.6 }} draggable={false}>
        {isVisible ? (
          <motion.div
            onClick={() => deleteSelectedFile(file.id)}
            onDoubleClick={() => addSelectedFile(file.id)}
            className={`${styles.card} ${fileSelected && styles.selected}`}
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
            }}
            animate={{ scale: isDragging ? 0.9 : 1 }}
          >
            <div className={styles.fileContainer}>
              {imageTypes.includes(file.mimeType) ? (
                <FileImage src={file.name} folderId={activeFolder} />
              ) : (
                <div className={styles.fileIcon}>
                  {fileSvg ? fileSvg.svg : fileTypes[0].svg}
                </div>
              )}
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
                      onBlur={editMode}
                    />
                    <button>-</button>
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
