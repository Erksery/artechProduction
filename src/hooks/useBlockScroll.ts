import { useEffect } from "react";

export const useBlockScroll = (open: boolean) => {
  useEffect(() => {
    const hasScroll =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;
    if (open && hasScroll) {
      document.body.classList.add("block-scroll");
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      document.body.classList.remove("block-scroll");
    };
  }, [open]);
};
