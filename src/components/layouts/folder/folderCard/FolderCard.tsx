import { useState } from "react";
import styles from "./FolderCard.module.scss";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { MdMoreVert } from "react-icons/md";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { FolderMenu } from "./menu/FolderMenu";

export const FolderCard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.folderCard}>
      <div className={styles.container}>
        <FcOpenedFolder className={styles.icon} />
        <div className={styles.info}>
          FolderCard
          <p>Создал: Erksery</p>
        </div>
      </div>

      <div>
        <MenuContainer
          element={<FolderMenu />}
          open={menuOpen}
          setOpen={setMenuOpen}
        >
          <button className={styles.button} onClick={() => setMenuOpen(true)}>
            <MdMoreVert />
          </button>
        </MenuContainer>
      </div>
    </div>
  );
};
