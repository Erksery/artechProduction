import styles from "./SignIn.module.scss";
import { Input } from "../../../ui/input/Input";
import { SubmitButton } from "../../../ui/buttons/submit/SubmitButton";

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
        placeholder="nickname"
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

      <SubmitButton
        text={loading ? "Загрузка..." : "Войти"}
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      />
      <div className={styles.route}>
        <p>Еще нет аккаунта?</p>
        <button onClick={() => activateTab("register")} className={styles.link}>
          Зарегистрироваться
        </button>
      </div>
    </>
  );
};
