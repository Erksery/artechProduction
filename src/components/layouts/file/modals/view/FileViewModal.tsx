import styles from "./FileViewModal.module.scss";
import React, { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "../../../../ui/modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

import { MdFileDownload } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MenuContainer } from "../../../../ui/menu/container/MenuContainer";
import { FileSettingMenu } from "./menu/FileSettingMenu";
import { fileTypes } from "../../../../../config/fileTypes";
import { imageTypes } from "../../../../../config/imageTypes";
import { useDownload } from "../../../../../hooks/useDownload";

const FileImage = lazy(() => import("../../image/FileImage"));

interface FileViewModalProps {
  activeFile: number;
}

export const FileViewModal: React.FC<FileViewModalProps> = ({ activeFile }) => {
  const [openFile, setOpenFile] = useState(activeFile);
  const [menuOpen, setMenuOpen] = useState(false);

  const files = useSelector((state: RootState) => state.files.files);
  const activeFolder = useSelector(
    (state: RootState) => state.folders.activeFolder
  );

  const { downloadFile } = useDownload();

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

  const fileSvg = fileTypes.find((element) =>
    element.mimeType.includes(files[openFile].mimeType)
  );

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
            {imageTypes.includes(files[openFile].mimeType) ? (
              <Suspense fallback={<div>Загрузка изображения...</div>}>
                <FileImage
                  src={files[openFile].name}
                  folderId={activeFolder}
                  height="100%"
                  className={styles.image}
                />
              </Suspense>
            ) : (
              <div className={styles.fileIcon}>
                {fileSvg ? fileSvg.svg : fileTypes[0].svg}
              </div>
            )}
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
          <div className={styles.null}></div>
          <div className={styles.name}>
            <p>{files[openFile].originalFilename}</p>
          </div>

          <div className={styles.tools}>
            <motion.button
              onClick={() => downloadFile(activeFolder, files[openFile].name)}
              whileHover={{
                scale: 0.9,
              }}
              whileTap={{
                scale: 0.85,
              }}
            >
              <MdFileDownload />
            </motion.button>
            <MenuContainer
              element={<FileSettingMenu />}
              open={menuOpen}
              setOpen={setMenuOpen}
            >
              <motion.button
                whileHover={{
                  scale: 0.9,
                }}
                whileTap={{
                  scale: 0.85,
                }}
              >
                <IoSettingsSharp />
              </motion.button>
            </MenuContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
};
