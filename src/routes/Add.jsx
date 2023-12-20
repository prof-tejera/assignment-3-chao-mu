// Ours - Components
import AddTimerForm from "@/components/workout/AddTimerForm";

import styles from "./Add.module.css";

const Add = () => {
  return (
    <section className={styles["add-page"]}>
      <AddTimerForm />
    </section>
  );
};

export default Add;
