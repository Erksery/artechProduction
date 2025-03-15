import styles from "./SignUp.module.scss";
import { Input } from "../../../ui/input/Input";

interface Props {
  error: string | null;
  loading: boolean;
  activateTab: (name: "register" | "login") => void;
}

export const SignUp = ({ error, loading, activateTab }: Props) => {
  return (
    <>
      <h2>Создать аккаунт</h2>
      <Input
        title="Имя"
        type="text"
        name="login"
        id="login"
        placeholder="example@gmail.com"
        autoComplete="current-password"
        required
      />
      <Input
        title="Пароль"
        type="password"
        name="password"
        id="password"
        placeholder="**********"
        autoComplete="current-password"
        required
      />
      {error && (
        <div className={styles.alert}>
          <p>{error}</p>
        </div>
      )}
      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Загрузка..." : "Зарегистрироваться"}
      </button>
      <div className={styles.route}>
        <p>Уже есть аккаунт?</p>
        <button onClick={() => activateTab("login")} className={styles.link}>
          Войти
        </button>
      </div>
    </>
  );
};
