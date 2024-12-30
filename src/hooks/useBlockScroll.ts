import { useEffect } from "react";

export const useBlockScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [open]);
};
