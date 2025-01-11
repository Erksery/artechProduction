import React, { useState } from "react";
import styles from "./FileViewModal.module.scss";
import { motion } from "framer-motion";
import { Modal } from "../../../../ui/modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { FileImage } from "../../fileImage/FileImage";

import { MdFileDownload } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { useModal } from "../../../../../hooks/useModal";
import { FileInfo } from "./modals/info/FileInfo";
import { FileSetting } from "./modals/setting/FileSetting";

interface FileViewModalProps {
  activeFile: number;
}

export const FileViewModal: React.FC<FileViewModalProps> = ({ activeFile }) => {
  const [openFile, setOpenFile] = useState(activeFile);
  const files = useSelector((state: RootState) => state.files.files);

  const { openModal } = useModal();

  const forwardList = () => {
    if (files.length - 1 !== openFile) {
      setOpenFile((prev) => prev + 1);
    }
  };

  const backList = () => {
    if (openFile !== 0) {
      setOpenFile((prev) => prev - 1);
    }
  };

  const buttons = [
    { id: 1, icon: <MdFileDownload />, event: () => console.log("1") },
    {
      id: 2,
      icon: <IoSettingsSharp />,
      event: () => openModal(<FileSetting />),
    },
    { id: 3, icon: <FiInfo />, event: () => openModal(<FileInfo />) },
  ];

  return (
    <Modal>
      <div className={styles.fileView}>
        <div className={styles.gallery}>
          <button
            onClick={backList}
            className={styles.but}
            disabled={files[openFile - 1] ? false : true}
          >
            <motion.div
              whileHover={{
                x: -5,
              }}
            >
              <FaChevronLeft />
            </motion.div>
          </button>

          <div className={styles.viewer}>
            <FileImage
              src={files[openFile].name}
              height={"100%"}
              compress={true}
            />
          </div>
          <button
            onClick={forwardList}
            className={styles.but}
            disabled={files[openFile + 1] ? false : true}
          >
            <motion.div
              whileHover={{
                x: +5,
              }}
            >
              <FaChevronRight />
            </motion.div>
          </button>
        </div>
        <div className={styles.info}>
          <div></div>
          <div className={styles.name}>
            <p>{files[openFile].name}</p>
          </div>

          <div className={styles.tools}>
            {buttons.map((button) => (
              <motion.button
                key={button.id}
                onClick={button.event}
                whileHover={{
                  scale: 0.9,
                }}
                whileTap={{
                  scale: 0.85,
                }}
              >
                {button.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
