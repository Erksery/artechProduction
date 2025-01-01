import styles from "./Upload.module.scss";
import { MdOutlineUploadFile } from "react-icons/md";
import { motion } from "framer-motion";

export const Upload = () => {
  return (
    <motion.div className={styles.uploadCard}>
      <motion.div
        animate={{
          rotate: 0,
        }}
        whileHover={{
          rotate: 15,
          scale: 1.2,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
      >
        <MdOutlineUploadFile />
      </motion.div>

      <p>
        <b>Нажмите</b> или перетащите, чтобы загрузить файл
      </p>
      <label>Максимальный размер файла не ограничен(пока)</label>
    </motion.div>
  );
};
