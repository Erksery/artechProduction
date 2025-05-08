import React, { useState, useEffect } from "react";
import styles from "./FloatingMenu.module.scss";
import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
} from "@floating-ui/react-dom";
import { useCloseScroll } from "../../../../hooks/useCloseScroll";

const FloatingMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    middleware: [offset(5), flip(), shift()],
    placement: "bottom-start" as Placement,
  });

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  const close = () => setOpen(false);
  useCloseScroll(open, setOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refs.reference.current &&
        refs.floating.current &&
        !(
          (refs.reference.current as HTMLElement).contains(
            event.target as Node
          ) ||
          (refs.floating.current as HTMLElement).contains(event.target as Node)
        )
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, close]);

  return (
    <div>
      <button ref={refs.setReference} onClick={toggleMenu}>
        Открыть меню
      </button>
      <div
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
        }}
        className={`${styles.menu} ${open ? styles.open : styles.closed}`}
      >
        <div>Пункт 1</div>
        <div>Пункт 2</div>
        <div>Пункт 3</div>
      </div>
    </div>
  );
};

export default FloatingMenu;
