// react-router-dom
import { useNavigate, useParams } from "react-router-dom";

// Ours - Utils
import throwNotFound from "@/utils/throwNotFound";

// Ours - Contexts
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useWorkoutDispatchContext } from "@/contexts/WorkoutContext";

// Ours - Components
import TimerForm from "@/components/timer/TimerForm";

// Ours - Styles
import styles from "./EditPage.module.css";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";

const EditPage = () => {
  const navigate = useNavigate();
  const { timerId } = useParams();

  const { plan } = useWorkoutContext();
  const workoutDispatch = useWorkoutDispatchContext();

  const timerOptions = plan.find((timer) => timer.id === timerId);
  if (timerOptions === undefined) {
    throwNotFound(`Timer with id ${timerId} not found`);
  }

  // Update the timer and redirect to home
  const handleSubmit = (options) => {
    workoutDispatch({
      type: WorkoutActionType.UPDATE_TIMER,
      payload: { options },
    });
    navigate("/");
  };

  return (
    <section className={styles["add-page"]}>
      <TimerForm values={timerOptions} onSubmit={handleSubmit} />
    </section>
  );
};

export default EditPage;
