// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummaryContainer from "@/components/workout/WorkoutSummaryContainer";
import TimerDisplayPlaceholder from "@/components/timer/TimerDisplayPlaceholder";
import TimerContainer from "@/components/timer/TimerContainer";
import WorkoutControls from "@/components/workout/WorkoutControls";

// Ours - Types
import { getCurrentTimer } from "@/types/workout";

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
  const workout = useWorkoutContext();
  const { plan } = workout;
  const currentTimerOptions = getCurrentTimer(workout);
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
        <TimerDisplayPlaceholder />
      ) : (
        <>
          <TimerContainer />
          <WorkoutControls />
          <WorkoutSummaryContainer />
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
