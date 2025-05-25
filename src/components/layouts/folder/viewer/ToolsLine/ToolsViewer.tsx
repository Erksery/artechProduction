import React from "react";
import { Tools } from "./tools/Tools";
import styles from "./ToolsLine.module.scss";

const FileCategories = React.lazy(
  () => import("@components/layouts/file/tools/categories/FileCategories")
);

interface Props {
  editMode: boolean;
}

export const ToolsViewer = ({ editMode }: Props) => {
  return (
    <div className={styles.toolsContainer}>
      {editMode ? <Tools /> : <FileCategories />}
    </div>
  );
};
