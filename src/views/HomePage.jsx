// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import TimerDisplayPlaceholder from "@/components/timer/TimerDisplayPlaceholder";
import TimerContainer from "@/components/timer/TimerContainer";
import WorkoutControls from "@/components/workout/WorkoutControls";

// Ours - Context
import {
  useWorkoutContext,
  useWorkoutDispatchContext,
} from "@/contexts/WorkoutContext";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";

// Ours - Style
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { plan, currentTimerOptions } = useWorkoutContext();
  const workoutDispatch = useWorkoutDispatchContext();

  const notReady = plan.length === 0;

  const removeTimer = (timerId) => {
    workoutDispatch({
      type: WorkoutActionType.REMOVE_TIMER,
      payload: { id: timerId },
    });
  };

  return (
    <div className={styles["home-page"]}>
      {notReady ? (
        <div className={styles["top-row"]}>
          <div />
          <TimerDisplayPlaceholder />
          <div />
        </div>
      ) : (
        <>
          <div className={styles["top-row"]}>
            <div className={styles.overview}>
              <WorkoutSummary plan={plan} />
            </div>
            <TimerContainer />
            <div className={styles["control-column"]}>
              <WorkoutControls />
            </div>
          </div>
          <WorkoutPlan
            plan={plan}
            selectedTimerId={currentTimerOptions && currentTimerOptions.id}
            onRemove={(timerId) => removeTimer(timerId)}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
