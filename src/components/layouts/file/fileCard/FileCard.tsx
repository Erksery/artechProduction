import React, { useState } from "react";
import styles from "./FileCard.module.scss";
import { FileImage } from "../fileImage/FileImage";
import { PiImagesSquare } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FileMenu } from "./menu/FileMenu";

interface FileCardProps {
  i: number;
}

export const FileCard: React.FC<FileCardProps> = ({ i }) => {
  const [fileMenu, setFileMenu] = useState(false);

  const closeMenu = () => {
    setFileMenu(false);
  };

  return (
    <div className={styles.card}>
      <FileImage src={""} />
      <div className={styles.info}>
        <p className={styles.type}>
          <PiImagesSquare className={styles.icon} />
          image/jpeg
        </p>
        <div className={styles.menu}>
          <p className={styles.name}>{i}fdfsdfsdgdsfdddffffffffffffffdffgd</p>
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
