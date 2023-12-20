// react-router-dom
import { useParams } from "react-router-dom";

// Ours - Components
import EditTimerForm from "@/components/workout/EditTimerForm";

// Ours - Styles
import styles from "./Edit.module.css";

const Edit = () => {
  const { timerId } = useParams();

  return (
    <section className={styles["add-page"]}>
      <EditTimerForm timerId={timerId} />
    </section>
  );
};

export default Edit;
