import { FolderData } from "@interfaces/folder";
import { FolderCardList } from "./FolderCardList";
import styles from "./FolderCardList.module.scss";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  subFolders: FolderData[];
  toggleOpen: (e: React.MouseEvent<HTMLElement>) => void;
  folders: FolderData[];
}

export const SubFolderList = ({
  open,
  subFolders,
  toggleOpen,
  folders,
}: Props) => {
  return (
    <>
      <AnimatePresence>
        {open && subFolders.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            className={styles.subFolder}
          >
            <hr onClick={toggleOpen} className={styles.line} />
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
