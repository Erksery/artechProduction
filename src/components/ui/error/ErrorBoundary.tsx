import { Component, ReactNode, ErrorInfo } from "react";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Фallback UI, который отображается при ошибке
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Обновляем состояние, чтобы показать fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Логирование ошибок (например, отправка в сторонний сервис)
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    // Сбрасываем состояние ошибки
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Отображаем fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className={styles.errorContainer}>
          <h2>Что-то пошло не так.</h2>
          <p>
            Ошибка: <label>{this.state.error?.message}</label>
          </p>
          <button style={{ width: 140, height: 40 }} onClick={this.handleRetry}>
            Попробовать снова
          </button>
        </div>
      );
    }

    // Рендерим дочерние компоненты, если ошибки нет
    return this.props.children;
  }
}
