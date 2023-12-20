import { useRouteError } from "react-router-dom";

import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <main className={styles["error-page"]}>
      <div className={styles["hgroup"]}>
        <h1>Oops! :-(</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <p className={styles["error"]}>
        <em>{error.statusText || error.message}</em>
      </p>
    </main>
  );
}
