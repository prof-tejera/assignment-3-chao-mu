// react-router-dom
import { useRouteError } from "react-router-dom";

// Ours - styles
import styles from "./FallbackPage.module.css";

export const FallbackForRouter = ({ onReset }) => {
  const error = useRouteError();

  return <FallbackComponent error={error} resetErrorBoundary={onReset} />;
};

export const FallbackComponent = ({ error, resetErrorBoundary }) => {
  return (
    <main className={styles["error-page"]}>
      <div className={styles["hgroup"]}>
        <h1>Oops! :-(</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <p className={styles["error"]}>
        <em>{error.statusText || error.message}</em>
      </p>
      <button className={styles["reset"]} onClick={() => resetErrorBoundary()}>
        Reset
      </button>
    </main>
  );
};
