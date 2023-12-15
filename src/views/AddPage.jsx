import TimerForm from "@/components/timer/TimerForm";

import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

import { useNavigate } from "react-router-dom";

import styles from "./AddPage.module.css";

const AddPage = () => {
  const navigate = useNavigate();

  const { addTimer } = useWorkoutContext();

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
