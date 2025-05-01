import { useEffect, useState } from "react";
import styles from "./SignIn.module.scss";
import { Input } from "../../../ui/input/Input";
import { SubmitButton } from "../../../ui/buttons/submit/SubmitButton";

interface Props {
  error: string | null;
  loading: boolean;
  activateTab: (name: "register" | "login") => void;
}

export const SignIn = ({ error, loading, activateTab }: Props) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isValid = login.trim() !== "" && password.trim() !== "";
    setCanSubmit(isValid);
  }, [login, password, setCanSubmit]);

  return (
    <>
      <h2>Войти в аккаунт</h2>
      <Input
        title="Логин"
        type="text"
        name="login"
        id="login"
        placeholder="Имя пользователя"
        autoComplete="current-password"
        required
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        title="Пароль"
        type="password"
        name="password"
        id="password"
        placeholder="**********"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <div className={styles.alert}>
          <p>{error}</p>
        </div>
      )}
      <SubmitButton
        text={loading ? "Загрузка..." : "Войти"}
        type="submit"
        disabled={!canSubmit || loading}
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
