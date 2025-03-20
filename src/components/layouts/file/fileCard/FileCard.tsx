import React, { useEffect, useRef, useState } from "react";
import styles from "./FileCard.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FileImage } from "../fileImage/FileImage";
import { PiImagesSquare } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FileMenu } from "./menu/FileMenu";
import { FileData } from "../../../../interfaces/file";
import { FileSkeleton } from "./FileSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

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

  const closeMenu = () => {
    setFileMenu(false);
  };

  const fileSelected = selected.includes(file.id);

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
      <motion.div ref={ref} exit={{ scale: 0.6 }}>
        {isVisible ? (
          <motion.div
            onClick={() => deleteSelectedFile(file.id)}
            onDoubleClick={() => addSelectedFile(file.id)}
            className={`${styles.card} ${fileSelected && styles.selected}`}
          >
            <FileImage src={file.name} folderId={activeFolder} />
            <div className={styles.info}>
              <p className={styles.type}>
                <PiImagesSquare className={styles.icon} />
                {file.mimeType}
              </p>
              <div className={styles.menu}>
                <p className={styles.name}>{file.name}</p>
                <MenuContainer
                  element={
                    <FileMenu
                      fileId={file.id}
                      activeFile={i}
                      close={closeMenu}
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
