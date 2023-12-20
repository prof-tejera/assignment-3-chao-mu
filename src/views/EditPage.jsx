// react-router-dom
import { useParams } from "react-router-dom";

// Ours - Components
import EditTimerForm from "@/components/workout/EditTimerForm";

// Ours - Styles
import styles from "./EditPage.module.css";

const EditPage = () => {
  const { timerId } = useParams();

  return (
    <section className={styles["add-page"]}>
      <EditTimerForm timerId={timerId} />
    </section>
  );
};

export default EditPage;
