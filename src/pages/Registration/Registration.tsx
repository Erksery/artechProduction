import { useState } from "react";
import { useRegUser } from "./hooks/useRegUser";

export const Registration = () => {
  const { registration, loading } = useRegUser();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    if (!login || !password) {
      setError("Все поля обязательны");
      return;
    }

    const result = await registration({ login, password });

    if (result.success) {
      setSuccess("Регистрация прошла успешно!");
    } else {
      setError(result.error ?? "Произошла неизвестная ошибка");
    }
  };

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="login" id="login" required />
        </div>
        <div>
          <input type="password" name="password" id="password" required />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};
