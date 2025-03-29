import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import { useModal } from "../../../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";

import { UserLogo } from "../../user/UserLogo/UserLogo";
import { AddModal } from "../modal/addModal/AddModal";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { SearchModal } from "../modal/searchModal/SearchModal";
import { AppDispatch, RootState } from "../../../../store";

import { BiEditAlt } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { UserMenu } from "../menu/UserMenu/UserMenu";
import { toggleEditMode } from "../../../../store/slices/files";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const { openModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.userData);
  const editMode = useSelector((state: RootState) => state.files.editMode);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.tools}>
          <MenuContainer
            element={<AddModal setOpen={setOpenMenu} />}
            open={openMenu}
            setOpen={setOpenMenu}
            position="left"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              className={styles.addButton}
            >
              <RiAddLine />
            </motion.button>
          </MenuContainer>

          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => openModal(<SearchModal />)}
            className={styles.addButton}
          >
            <IoSearchSharp />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => dispatch(toggleEditMode())}
            className={`${styles.addButton} ${editMode && styles.active}`}
          >
            <BiEditAlt />
          </motion.button>
        </div>
        <div className={styles.user}>
          <MenuContainer
            element={<UserMenu />}
            open={userMenu}
            setOpen={setUserMenu}
          >
            <UserLogo user={user} />
          </MenuContainer>
        </div>
      </div>
    </>
  );
};
