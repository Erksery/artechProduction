import { useRef, useState } from "react";
import styles from "./Header.module.scss";
import { RiAddLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { UserLogo } from "../../user/UserLogo/UserLogo";
import { AddModal } from "../modal/addModal/AddModal";
import { MenuContainer } from "../../../ui/menu/MenuContainer";
import { motion } from "framer-motion";
import { useModal } from "../../../../hooks/useModal";
import { SearchModal } from "../modal/searchModal/SearchModal";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { openModal, closeModal } = useModal();

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
        </div>
        <div className={styles.user}>
          <UserLogo />
        </div>
      </div>
    </>
  );
};
