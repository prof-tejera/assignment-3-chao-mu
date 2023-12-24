// react-router-dom
import { useRouteError } from "react-router-dom";

// Ours - styles
import styles from "./FallbackPage.module.css";

export const FallbackForRouter = () => {
  const error = useRouteError();

  return <FallbackComponent error={error} />;
};

export const FallbackComponent = ({ error }) => {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <main className={styles["error-page"]}>
      <div className={styles["hgroup"]}>
        <h1>Oops! :-(</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <p className={styles["error"]}>
        <em>{error.statusText || error.message}</em>
      </p>
      <button className={styles["reset"]} onClick={refresh}>
        Refresh
      </button>
    </main>
  );
};
