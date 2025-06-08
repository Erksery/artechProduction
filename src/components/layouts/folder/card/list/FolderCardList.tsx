import { useEffect, useMemo } from "react";

import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetUser } from "@hooks/useGetUser";
import { FileType, useFolderCardLogic } from "../hooks/useFolderCardLogic";

import { setActiveFolder } from "@store/slices/folders";
import { AppDispatch } from "@store/index";

import { FolderData } from "@interfaces/folder";

import { SubFolderList } from "./SubFolderList";
import { FolderCardTools } from "./FolderCardTools";
import { FolderCardInfo } from "./FolderCardInfo";

interface FolderCardProps {
  folder: FolderData;
  folders: FolderData[];
}

export const FolderCardList = ({ folder, folders }: FolderCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    menuOpen,
    setMenuOpen,
    subListOpen,
    linkRef,
    activeFolder,
    closeMenu,
    toggleListOpen,
    dropFile,
    folderCardClassName,
  } = useFolderCardLogic();

  const { getUser, userData } = useGetUser();

  const subFolders = useMemo(
    () => folders.filter((subFolder) => subFolder.inFolder === folder.id),
    [folders, folder.id]
  );

  const [{ isOver }, drop] = useDrop({
    accept: "FILE",
    drop: (item: FileType) => {
      dropFile(folder, item);
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
          onClick={() => dispatch(setActiveFolder(folder.id))}
          className={folderCardClassName(folder.id, isOver)}
          draggable={false}
        >
          <FolderCardInfo
            activeFolder={activeFolder}
            folder={folder}
            userData={userData}
          />

          <FolderCardTools
            folder={folder}
            subFolders={subFolders}
            toggleListOpen={toggleListOpen}
            subListOpen={subListOpen}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            closeMenu={closeMenu}
          />
        </Link>
      </motion.div>

      <SubFolderList
        open={subListOpen}
        subFolders={subFolders}
        toggleOpen={toggleListOpen}
        folders={folders}
      />
    </>
  );
};
