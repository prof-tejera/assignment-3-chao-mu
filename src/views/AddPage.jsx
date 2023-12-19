// react-router-dom
import { useNavigate } from "react-router-dom";

// Ours - Components
import TimerForm from "@/components/timer/TimerForm";

// Ours - Contexts
import { useWorkoutDispatchContext } from "@/contexts/WorkoutContext";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";

import styles from "./AddPage.module.css";

const AddPage = () => {
  const navigate = useNavigate();

  const workoutDispatch = useWorkoutDispatchContext();

  // Add the timer and redirect to home
  const handleSubmit = (options) => {
    workoutDispatch({
      type: WorkoutActionType.ADD_TIMER,
      payload: { options },
    });
    navigate("/");
  };

  return (
    <section className={styles["add-page"]}>
      <TimerForm onSubmit={handleSubmit} />
    </section>
  );
};

export default AddPage;
