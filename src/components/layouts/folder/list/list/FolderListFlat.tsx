import React, { useMemo } from "react";
import styles from "./FolderListFlat.module.scss";
import { FolderData } from "../../../../../interfaces/folder";
import { PRIVACY_VALUES } from "../../../../../config/constants";
import { FolderSection } from "./section/FolderSection";

import { IoEyeOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";

interface FolderListProps {
  folders: FolderData[];
}

export const FolderListFlat: React.FC<FolderListProps> = ({ folders }) => {
  const { publicFolders, privateFolders } = useMemo(() => {
    const parentFolders = folders.filter((folder) => folder.inFolder === null);
    return {
      publicFolders: parentFolders.filter(
        (folder) =>
          folder.privacy === PRIVACY_VALUES.PUBLIC ||
          folder.privacy === PRIVACY_VALUES.LINK
      ),
      privateFolders: parentFolders.filter(
        (folder) => folder.privacy === PRIVACY_VALUES.PRIVATE
      ),
    };
  }, [folders]);

  return (
    <div className={styles.list}>
      <FolderSection
        parentFolderList={publicFolders}
        folders={folders}
        title="Публичные папки"
        icon={<GrGroup />}
      />
      <FolderSection
        parentFolderList={privateFolders}
        folders={folders}
        title="Личные папки"
        icon={<IoEyeOutline />}
      />
    </div>
  );
};
