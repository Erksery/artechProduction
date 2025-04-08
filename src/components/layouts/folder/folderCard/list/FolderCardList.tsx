import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./FolderCardList.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { MenuContainer } from "../../../../ui/menu/MenuContainer";
import { FolderMenu } from "../menu/FolderMenu";
import { FolderData } from "../../../../../interfaces/folder";
import { FcOpenedFolder, FcFolder } from "react-icons/fc";
import { MdMoreVert } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useDrop } from "react-dnd";
import { FileData } from "../../../../../interfaces/file";
import { useEditFile } from "../../../../../hooks/useEditFile";
import { useGetUser } from "../../../../../hooks/useGetUser";
import { UserLogo } from "../../../user/UserLogo/UserLogo";

interface FolderCardProps {
  folder: FolderData;
  folders: FolderData[];
}

interface FileType {
  file: FileData;
}

export const FolderCardList: React.FC<FolderCardProps> = ({
  folder,
  folders,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subListOpen, setSubListOpen] = useState(false);

  const linkRef = useRef<HTMLAnchorElement>(null);

  const { editFile } = useEditFile();
  const { getUser, userData } = useGetUser();

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

  const [{ isOver }, drop] = useDrop({
    accept: "FILE",
    drop: (item: FileType) => {
      console.log("Файл перемещен:", item.file);
      editFile(folder.id, item.file.id, { folderId: folder.id });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (linkRef.current) {
      drop(linkRef.current);
    }
  }, [drop]);

  useEffect(() => {
    getUser(folder.creator);
  }, [folder.creator]);

  return (
    <>
      <motion.div animate={{ scale: isOver ? 0.95 : 1 }}>
        <Link
          ref={linkRef}
          key={folder.id}
          to={`/folder/${folder.id}`}
          className={`${styles.folderCard} ${
            activeFolder === folder.id ? styles.active : ""
          } ${isOver ? styles.drop : ""} `}
          draggable={false}
        >
          <div className={styles.container}>
            <div className={styles.iconContainer}>
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
              <div className={styles.logoContainer}>
                <UserLogo user={userData} className={styles.logo} />
              </div>
            </div>

            <div className={styles.info}>
              <p>{folder.name}</p>
            </div>
          </div>

          <div className={styles.tools}>
            {subFolders.length > 0 && (
              <button className={styles.button} onClick={toggleListOpen}>
                <div
                  style={{ transform: `rotate(${subListOpen ? 180 : 0}deg)` }}
                >
                  <IoChevronDownOutline />
                </div>
              </button>
            )}
            <MenuContainer
              element={<FolderMenu id={folder.id} close={closeMenu} />}
              open={menuOpen}
              setOpen={setMenuOpen}
            >
              <button
                className={styles.button}
                onClick={() => setMenuOpen(true)}
              >
                <MdMoreVert />
              </button>
            </MenuContainer>
          </div>
        </Link>
      </motion.div>

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
                <FolderCardList
                  key={folder.id}
                  folder={folder}
                  folders={folders}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
