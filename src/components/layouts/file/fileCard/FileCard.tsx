import React, { useState } from "react";
import styles from "./FileCard.module.scss";
import { FileImage } from "../fileImage/FileImage";
import { PiImagesSquare } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FileMenu } from "./menu/FileMenu";
import { FileData } from "../../../../interfaces/file";

interface FileCardProps {
  file: FileData;
  i: number;
}

export const FileCard: React.FC<FileCardProps> = ({ file, i }) => {
  const [fileMenu, setFileMenu] = useState(false);

  const url = "http://192.168.0.3:3005";
  const compressImage = `${url}/compressedImage/${file.name}`;

  const closeMenu = () => {
    setFileMenu(false);
  };

  return (
    <div className={styles.card}>
      <FileImage src={compressImage} />
      <div className={styles.info}>
        <p className={styles.type}>
          <PiImagesSquare className={styles.icon} />
          {file.type}
        </p>
        <div className={styles.menu}>
          <p className={styles.name}>{file.name}</p>
          <MenuContainer
            element={<FileMenu file={i} close={closeMenu} />}
            open={fileMenu}
            setOpen={setFileMenu}
          >
            <button className={styles.menuButton}>
              <IoMdMore />
            </button>
          </MenuContainer>
        </div>
      </div>
    </div>
  );
};
