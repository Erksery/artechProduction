import React, { useEffect, useRef, useState } from "react";
import styles from "./FileCard.module.scss";
import { motion } from "framer-motion";
import { FileImage } from "../fileImage/FileImage";
import { PiImagesSquare } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FileMenu } from "./menu/FileMenu";
import { FileData } from "../../../../interfaces/file";
import { FileSkeleton } from "./FileSkeleton";

interface FileCardProps {
  file: FileData;
  i: number;
}

export const FileCard: React.FC<FileCardProps> = ({ file, i }) => {
  const [fileMenu, setFileMenu] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const closeMenu = () => {
    setFileMenu(false);
  };
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
    <motion.div ref={ref}>
      {isVisible ? (
        <motion.div className={styles.card}>
          <FileImage src={file.name} />
          <div className={styles.info}>
            <p className={styles.type}>
              <PiImagesSquare className={styles.icon} />
              {file.type}
            </p>
            <div className={styles.menu}>
              <p className={styles.name}>{file.name}</p>
              <MenuContainer
                element={
                  <FileMenu fileId={file.id} activeFile={i} close={closeMenu} />
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
  );
};
