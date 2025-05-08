import styles from "./FolderCardGrid.module.scss";
import { FolderData } from "../../../../../interfaces/folder";
import { Link } from "react-router-dom";
import { MenuContainer } from "../../../../ui/menu/container/MenuContainer";
import { FolderMenu } from "../menu/FolderMenu";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";

interface Props {
  folder: FolderData;
}
export const FolderCardGrid = ({ folder }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Link to={`/folder/${folder.id}`} className={styles.card}>
      <div className={styles.infoContainer}>
        <h3>{folder.name}</h3>
      </div>
      <MenuContainer
        element={
          <FolderMenu
            id={folder.id}
            folder={folder}
            close={() => setMenuOpen(false)}
          />
        }
        open={menuOpen}
        setOpen={setMenuOpen}
      >
        <button className={styles.button} onClick={() => setMenuOpen(true)}>
          <MdMoreVert />
        </button>
      </MenuContainer>
    </Link>
  );
};
