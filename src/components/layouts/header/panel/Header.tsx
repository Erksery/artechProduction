import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import { useModal } from "../../../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";

import { UserLogo } from "../../user/logo/UserLogo";
import { AddModal } from "../modal/insert/AddModal";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { SearchModal } from "../modal/search/SearchModal";
import { AppDispatch, RootState } from "../../../../store";

import { LuSettings2 } from "react-icons/lu";
import { RiAddLine, RiMenuFoldLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";

import { UserMenu } from "../menu/user/UserMenu";
import { PullMenu } from "../../menu/pull/PullMenu";
import { toggleSideMenu } from "../../../../store/slices/folders";

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
            onClick={() => openModal(<SearchModal />)}
            className={styles.addButton}
          >
            <IoSearchSharp />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => openModal(<PullMenu />)}
            className={styles.addButton}
          >
            <LuSettings2 />
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
