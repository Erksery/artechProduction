import { UsersList } from "@components/layouts/user/list/UsersList";
import styles from "./AdminPanel.module.scss";
import { Header } from "@components/layouts/header/panel/Header";

export const AdminPanel = () => {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.grid}>
        <UsersList className={styles.block1} />
        <div className={styles.block2}>2</div>
        <div className={styles.block3}>3</div>
      </div>
    </div>
  );
};
