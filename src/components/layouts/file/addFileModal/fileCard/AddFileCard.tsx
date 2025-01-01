import styles from "./AddFileCard.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFileCode } from "react-icons/fa";

export const AddFileCard = () => {
  return (
    <div className={styles.fileCard}>
      <div className={styles.icon}>
        <FaRegFileCode />
      </div>
      <div className={styles.info}>
        <p>Dbsahfbhf.jpg</p>
        <label>32 Кб</label>
        <label>image/jpg</label>
      </div>
      <div className={styles.delete}>
        <button>
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
};
