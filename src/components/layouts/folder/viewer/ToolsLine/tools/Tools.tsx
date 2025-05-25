import styles from "./Tools.module.scss";

import { MdOutlineDelete } from "react-icons/md";
import { toolsButtons } from "./ToolsButtons";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { usePasteFiles } from "./hooks/usePasteFiles";
import { useCopyFiles } from "./hooks/useCopyFiles";

export const Tools = () => {
  const folderId = useSelector(
    (state: RootState) => state.folders.activeFolder
  );

  const { pasteFilesToFolder } = usePasteFiles();
  const { copyFiles } = useCopyFiles();

  const buttons = toolsButtons({
    folderId,
    pasteFilesToFolder,
    copyFiles,
  });

  return (
    <div className={styles.tools}>
      <div className={styles.block}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={button.event}
            className={styles.toolButton}
          >
            {button.icon}
            {button.title}
          </button>
        ))}
      </div>
      <button className={`${styles.toolButton} ${styles.deleteButton}`}>
        <MdOutlineDelete />
        Удалить
      </button>
    </div>
  );
};
