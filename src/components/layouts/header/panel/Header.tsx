import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UserLogo } from "../../user/logo/UserLogo";
import { AddModal } from "../modal/insert/AddModal";
import { MenuContainer } from "../../../ui/menu/container/MenuContainer";

import { AppDispatch, RootState } from "../../../../store";

import { RiAddLine, RiMenuFoldLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";

import { UserMenu } from "../menu/user/UserMenu";

import { toggleSideMenu } from "../../../../store/slices/folders";
import { useModal } from "@hooks/modal/useModal";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.userData);
  const sideMenu = useSelector(
    (state: RootState) => state.folders.openSideMenu
  );
  const { openModal } = useModal();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.tools}>
          {!sideMenu && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              onClick={() => dispatch(toggleSideMenu())}
              className={styles.addButton}
            >
              <RiMenuFoldLine />
            </motion.button>
          )}

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
            onClick={() => openModal({ name: "fileSearch" })}
            className={styles.addButton}
          >
            <IoSearchSharp />
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
