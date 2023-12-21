import { Link, Outlet } from "react-router-dom";

import styles from "./SiteLayout.module.css";

const SiteLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <span className={styles["site-title"]}>Timers by Autumn</span>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/workout">Workout</Link>
            </li>
            <li>
              <Link to="/add">Add Timer</Link>
            </li>
            <li>
              <Link to="/docs">Documentation</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main data-testid="main" className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default SiteLayout;
