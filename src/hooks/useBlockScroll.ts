import { useEffect } from "react";

export const useBlockScroll = (open: boolean) => {
  useEffect(() => {
    let timeoutId: number;

    if (open) {
      timeoutId = window.setTimeout(() => {
        const hasScroll =
          document.documentElement.scrollHeight >
          document.documentElement.clientHeight;
        if (hasScroll) {
          document.body.classList.add("block-scroll");
        }
      }, 30);
    } else {
      document.body.classList.remove("block-scroll");
    }

    return () => {
      clearTimeout(timeoutId);
      document.body.classList.remove("block-scroll");
    };
  }, [open]);
};
