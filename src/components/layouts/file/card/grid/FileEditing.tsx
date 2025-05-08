import styles from "./FileCard.module.scss";
import { useState } from "react";
import { MenuContainer } from "../../../../ui/menu/container/MenuContainer";
import { FileMenu } from "../menu/FileMenu";
import { FileCardProps } from "./FileCard";

import { useEditFile } from "../../../../../hooks/useEditFile";

import { IoMdMore } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

interface Props extends FileCardProps {
  activeFolder: string | undefined;
}

export const FileEditing = ({ file, i, activeFolder }: Props) => {
  const [fileMenu, setFileMenu] = useState(false);
  const { editMode, editing, inputRef, setEditValue, submitEditFile } =
    useEditFile();
  return (
    <>
      {editing ? (
        <form
          onSubmit={(e) => submitEditFile(e, file.folderId, file.id)}
          className={styles.editContainer}
        >
          <input
            ref={inputRef}
            defaultValue={file.originalFilename}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={(e) => {
              const nextFocused = e.relatedTarget;

              if (!nextFocused || nextFocused.tagName !== "BUTTON") {
                editMode();
              }
            }}
          />
          <button type="submit">
            <FaCheck />
          </button>
        </form>
      ) : (
        <>
          <p className={styles.name}>{file.originalFilename}</p>
          <MenuContainer
            element={
              <FileMenu
                file={file}
                fileId={file.id}
                folderId={activeFolder}
                activeFile={i}
                close={() => setFileMenu(false)}
                editMode={editMode}
              />
            }
            open={fileMenu}
            setOpen={setFileMenu}
            blur={true}
          >
            <button className={styles.menuButton}>
              <IoMdMore />
            </button>
          </MenuContainer>
        </>
      )}
    </>
  );
};
