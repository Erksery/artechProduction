import React, { ChangeEvent, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  id?: string;
  name?: string;
  value?: string;
  title?: string;
  type?: "text" | "number" | "password" | "email" | "search";
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  title = "Input",
  placeholder = "Input",
  type = "text",
  required = false,
  multiline = false,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.trim();

    if (required && !value) {
      setError("Обязательное поле");
    } else if (
      type === "email" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ) {
      setError("Некорректный email");
    } else if (type === "password" && value.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
    } else {
      setError(null);
    }
  };

  return (
    <div className={`${styles.inputContainer} ${error && styles.error}`}>
      <label>
        <p>{title}</p>
        {multiline ? (
          <textarea {...props} placeholder={placeholder} onBlur={handleBlur} />
        ) : (
          <input
            {...props}
            type={type}
            required={required}
            placeholder={placeholder}
            onBlur={handleBlur}
            onInvalid={(e) => {
              e.preventDefault();
            }}
          />
        )}
      </label>
    </div>
  );
};
