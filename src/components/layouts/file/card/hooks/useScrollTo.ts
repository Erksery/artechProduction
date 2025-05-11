import { RootState } from "@store/index";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useScrollTo = () => {
  const activeFile = useSelector((state: RootState) => state.files.activeFile);
  const prevFileRef = useRef<string | null>(null);

  const scrollToFile = (fileId: string) => {
    const element = document.getElementById(`file-${fileId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (activeFile && activeFile !== prevFileRef.current) {
      scrollToFile(activeFile);
      prevFileRef.current = activeFile;
    }
  }, [activeFile]);

  return { scrollToFile };
};
