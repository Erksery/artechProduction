import { fileTypes } from "@config/fileTypes";
import { useMemo } from "react";

export const useSvgType = (mimeType: string) => {
  const fileSvg = useMemo(() => {
    return (
      fileTypes.find((element) => element.mimeType.includes(mimeType)) ||
      fileTypes[0]
    );
  }, [mimeType]);

  return {
    fileSvg,
  };
};
