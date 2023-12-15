import TimerForm from "@/components/timer/TimerForm";

import usePlanContext from "@/contexts/plan/usePlanContext";

import { useNavigate } from "react-router-dom";

import styles from "./AddPage.module.css";

const AddPage = () => {
  const navigate = useNavigate();

  const { addTimer } = usePlanContext();

  // Add the timer and redirect to home
  const handleSubmit = (timer) => {
    addTimer(timer);
    navigate("/");
  };

  return (
    <section className={styles["add-page"]}>
      <TimerForm onSubmit={handleSubmit} />
    </section>
  );
};

export default AddPage;
