import { useState } from "react";
import styles from "./Header.module.scss";
import { RiAddLine } from "react-icons/ri";
import { UserLogo } from "../../user/UserLogo/UserLogo";
import { AddModal } from "../modal/addModal/AddModal";
import { MenuContainer } from "../../../ui/menu/MenuContainer";

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.tools}>
          <MenuContainer
            element={<AddModal setOpen={setOpen} />}
            open={open}
            setOpen={setOpen}
          >
            <button className={styles.addButton}>
              <RiAddLine />
            </button>
          </MenuContainer>
        </div>
        <div className={styles.user}>
          <UserLogo />
        </div>
      </div>
    </>
  );
};
