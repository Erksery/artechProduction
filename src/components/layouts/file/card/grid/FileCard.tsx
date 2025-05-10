import React, { useRef } from "react";

import { AnimatePresence } from "framer-motion";

import { useObserver } from "../../../../../hooks/useObserver";

import { FileData } from "../../../../../interfaces/file";
import { FileView } from "./FileView";
import { FileSkeleton } from "./FileSkeleton";

export interface FileCardProps {
  file: FileData;
  i: number;
}

export const FileCard = React.memo(({ file, i }: FileCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { isVisible } = useObserver(ref);

  return (
    <AnimatePresence>
      <div ref={ref} draggable={false}>
        {isVisible ? <FileView file={file} i={i} /> : <FileSkeleton />}
      </div>
    </AnimatePresence>
  );
});
