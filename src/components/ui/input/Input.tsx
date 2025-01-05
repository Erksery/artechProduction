import React, { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email" | "search";
  multiline?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "Input",
  type = "text",
  multiline = false,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>
        <p>{placeholder}</p>
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange} // Теперь поддерживается как <input>, так и <textarea>
            className={error ? styles.error : ""}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange} // Совместимость с <input>
            className={error ? styles.error : ""}
            {...props}
          />
        )}
      </label>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
