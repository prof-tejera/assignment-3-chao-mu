// react-router-dom
import { useNavigate } from "react-router-dom";

// Ours - Components
import AddTimerForm from "@/components/workout/AddTimerForm";

import styles from "./AddPage.module.css";

const AddPage = () => {
  return (
    <section className={styles["add-page"]}>
      <AddTimerForm />
    </section>
  );
};

export default AddPage;
