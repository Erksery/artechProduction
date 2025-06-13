import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  Ref,
  TextareaHTMLAttributes,
  useState
} from 'react'

import styles from './Input.module.scss'

interface BaseProps {
  title?: string
  multiline?: boolean
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps | TextareaProps
>((props, ref) => {
  const {
    title = 'Input',
    placeholder = 'Input',
    type = 'text',
    required = false,
    multiline = false,
    ...rest
  } = props as InputProps

  const [error, setError] = useState<string | null>(null)

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.trim()

    if (required && !value) {
      setError('Обязательное поле')
    } else if (
      type === 'email' &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ) {
      setError('Некорректный email')
    } else if (type === 'password' && value.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
    } else {
      setError(null)
    }
  }

  return (
    <div className={`${styles.inputContainer} ${error ? styles.error : ''}`}>
      <label>
        <p>{title}</p>
        {multiline ? (
          <textarea
            {...(rest as TextareaProps)}
            ref={ref as Ref<HTMLTextAreaElement>}
            placeholder={placeholder}
            onBlur={handleBlur}
          />
        ) : (
          <input
            {...(rest as InputProps)}
            ref={ref as Ref<HTMLInputElement>}
            type={type}
            required={required}
            placeholder={placeholder}
            onBlur={handleBlur}
            onInvalid={e => e.preventDefault()}
          />
        )}
      </label>
    </div>
  )
})

Input.displayName = 'Input'
