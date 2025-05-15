import { useEffect, useRef, useState } from "react";
import styles from "./EmptyList.module.scss";
import { gsap } from "gsap";

interface Props {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

const Menu = ({ isOpen, onClose }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => onClose(false),
      });
    }
  }, [isOpen]);

  return (
    <div ref={menuRef} className={styles.menu}>
      <p>Menu</p>
      <p>Menu</p>
      <p>Menu</p>
    </div>
  );
};

export const EmptyList = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      Папка пуста
      {/*<div className={styles.menuContainer}>
        <button onClick={() => setOpen((prev) => !prev)}>Open</button>
        {open && <Menu isOpen={open} onClose={() => setOpen(false)} />}
      </div> */}
    </div>
  );
};
