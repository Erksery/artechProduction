import styles from "./SignIn.module.scss";
import { Input } from "../../../ui/input/Input";

interface Props {
  error: string | null;
  loading: boolean;
  activateTab: (name: "register" | "login") => void;
}

export const SignIn = ({ error, loading, activateTab }: Props) => {
  return (
    <>
      <h2>Войти в аккаунт</h2>
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
        {loading ? "Загрузка..." : "Войти"}
      </button>
      <div className={styles.route}>
        <p>Еще нет аккаунта?</p>
        <button onClick={() => activateTab("register")} className={styles.link}>
          Зарегистрироваться
        </button>
      </div>
    </>
  );
};
