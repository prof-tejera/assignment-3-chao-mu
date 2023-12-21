// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummaryContainer from "@/components/workout/WorkoutSummaryContainer";
import TimerDisplayPlaceholder from "@/components/timer/TimerDisplayPlaceholder";
import TimerContainer from "@/components/timer/TimerContainer";
import WorkoutControls from "@/components/workout/WorkoutControls";

// Ours - Types
import { getCurrentTimer } from "@/types/workout";

// Ours - Context
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useWorkoutManagementContext } from "@/contexts/WorkoutManagementContext";

// Ours - Style
import styles from "./Workout.module.css";

const Workout = () => {
  const workout = useWorkoutContext();
  const { plan } = workout;

  const { removeTimer } = useWorkoutManagementContext();

  const currentTimerOptions = getCurrentTimer(workout);

  const notReady = plan.length === 0;

  return (
    <div className={styles["workout-page"]}>
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
            onRemove={(timerId) => removeTimer({ id: timerId })}
          />
        </>
      )}
    </div>
  );
};

export default Workout;
