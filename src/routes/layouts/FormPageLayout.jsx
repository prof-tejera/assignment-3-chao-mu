// react-router-dom
import { Outlet } from "react-router-dom";

// Ours - Styles
import styles from "./FormPageLayout.module.css";

const FormPageLayout = () => (
  <main className={styles["form-page-layout"]}>
    <Outlet />
  </main>
);

export default FormPageLayout;
