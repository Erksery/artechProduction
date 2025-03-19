import React, { useMemo, useState } from "react";
import styles from "./FolderCard.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FolderMenu } from "./menu/FolderMenu";
import { FolderData } from "../../../../interfaces/folder";

import { FcOpenedFolder, FcFolder } from "react-icons/fc";
import { MdMoreVert } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface FolderCardProps {
  folder: FolderData;
  folders: FolderData[];
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder, folders }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subListOpen, setSubListOpen] = useState(false);
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );

  const subFolders = useMemo(
    () => folders.filter((subFolder) => subFolder.inFolder === folder.id),
    [folders, folder.id]
  );

  const toggleListOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSubListOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <>
      <Link
        to={`/folder/${folder.id}`}
        className={`${styles.folderCard} ${
          activeFolder === folder.id ? styles.active : ""
        }`}
        draggable={false}
      >
        <div className={styles.container}>
          {activeFolder === folder.id ? (
            <FcOpenedFolder
              className={`${styles.icon} ${
                folder.privacy === "Private" && styles.private
              }`}
            />
          ) : (
            <FcFolder
              className={`${styles.icon} ${
                folder.privacy === "Private" && styles.private
              }`}
            />
          )}

          <div className={styles.info}>
            <p>{folder.name}</p>

            {/*<label>Создал: {folder.creator[0]}</label> */}
          </div>
        </div>

        <div className={styles.tools}>
          {subFolders.length > 0 && (
            <button className={styles.button} onClick={toggleListOpen}>
              <div style={{ transform: `rotate(${subListOpen ? 180 : 0}deg)` }}>
                <IoChevronDownOutline />
              </div>
            </button>
          )}
          <MenuContainer
            element={<FolderMenu id={folder.id} close={closeMenu} />}
            open={menuOpen}
            setOpen={setMenuOpen}
          >
            <button className={styles.button} onClick={() => setMenuOpen(true)}>
              <MdMoreVert />
            </button>
          </MenuContainer>
        </div>
      </Link>
      <AnimatePresence>
        {subListOpen && subFolders.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            className={styles.subFolder}
          >
            <hr onClick={toggleListOpen} className={styles.line} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={styles.subFolderList}
            >
              {subFolders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} folders={folders} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
