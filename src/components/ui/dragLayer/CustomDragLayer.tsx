import { useDragLayer } from "react-dnd";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CustomDragLayer.module.scss";
import { useEffect, useRef, useState } from "react";

export const CustomDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const previewRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 200 });
  const springY = useSpring(y, { damping: 20, stiffness: 200 });

  // Центрирование относительно размера превью
  useEffect(() => {
    if (previewRef.current) {
      const { width, height } = previewRef.current.getBoundingClientRect();
      setOffset({ x: width / 2, y: height / 2 });
    }
  }, [item]);

  // Обновляем координаты, как только они приходят
  useEffect(() => {
    if (currentOffset) {
      x.set(currentOffset.x - offset.x);
      y.set(currentOffset.y - offset.y);
    }
  }, [currentOffset, offset.x, offset.y]);

  if (!isDragging || !currentOffset) return null;

  return (
    <motion.div
      ref={previewRef}
      className={styles.layer}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 1000,
        x: springX,
        y: springY,
      }}
    >
      FileName: {item?.file?.originalFilename}
    </motion.div>
  );
};
