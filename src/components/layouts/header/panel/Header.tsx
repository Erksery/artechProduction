import styles from "./Header.module.scss";
import { useState } from "react";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@store/index";
import { toggleSideMenu } from "@store/slices/folders";

import { RiAddLine, RiMenuFoldLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { LuSunMedium, LuMoon } from "react-icons/lu";

import { UserMenu } from "../menu/user/UserMenu";

import { useModal } from "@hooks/modal/useModal";
import { useTheme } from "@hooks/useTheme";

import { AddModal } from "../modal/insert/AddModal";
import { MenuContainer } from "@components/ui/menu/container/MenuContainer";
import { UserLogo } from "@components/layouts/user/logo/UserLogo";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.userData);
  const sideMenu = useSelector(
    (state: RootState) => state.folders.openSideMenu
  );

  const { openModal } = useModal();
  const { theme, toggleTheme } = useTheme();

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
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleTheme}
            className={styles.addButton}
          >
            {theme === "light" ? <LuSunMedium /> : <LuMoon />}
          </motion.button>
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
