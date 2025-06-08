import styles from "./FolderCardList.module.scss";

import { IoChevronDownOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { FolderData } from "@interfaces/folder";

import { FolderMenu } from "../menu/FolderMenu";
import { MenuContainer } from "@components/ui/menu/container/MenuContainer";

interface Props {
  folder: FolderData;
  subFolders: FolderData[];
  subListOpen: boolean;
  menuOpen: boolean;

  toggleListOpen: (e: React.MouseEvent<HTMLElement>) => void;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: () => void;
}

export const FolderCardTools = ({
  folder,
  subFolders,
  subListOpen,
  menuOpen,
  setMenuOpen,
  closeMenu,
  toggleListOpen,
}: Props) => {
  return (
    <div className={styles.tools}>
      {subFolders.length > 0 && (
        <button className={styles.button} onClick={toggleListOpen}>
          <div style={{ transform: `rotate(${subListOpen ? 180 : 0}deg)` }}>
            <IoChevronDownOutline />
          </div>
        </button>
      )}
      <MenuContainer
        element={
          <FolderMenu id={folder.id} folder={folder} close={closeMenu} />
        }
        open={menuOpen}
        setOpen={setMenuOpen}
        blur={true}
      >
        <button className={styles.button} onClick={() => setMenuOpen(true)}>
          <MdMoreVert />
        </button>
      </MenuContainer>
    </div>
  );
};
