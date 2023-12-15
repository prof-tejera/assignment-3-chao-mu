// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import TimerDisplayPlaceholder from "@/components/timer/TimerDisplayPlaceholder";
import TimerDisplay from "@/components/timer/TimerDisplay";
import WorkoutControls from "@/components/workout/WorkoutControls";

// Ours - Context
import usePlanContext from "@/contexts/plan/usePlanContext";
import useTimerContext from "@/contexts/timer/useTimerContext";

// Ours - Style
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { plan, removeTimer } = usePlanContext();
  const { timerSnapshot, isWorkoutActive } = useTimerContext();

  const notReady = timerSnapshot === null;

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
            <TimerDisplay timerSnapshot={timerSnapshot} />
            <div className={styles["control-column"]}>
              <WorkoutControls />
            </div>
          </div>
          <WorkoutPlan
            plan={plan}
            selectedTimerId={timerSnapshot && timerSnapshot.id}
            onRemove={(timer) => removeTimer(timer)}
            isWorkoutActive={isWorkoutActive}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
