// React
import { useState } from "react";

// Ours - Hooks
import useInterval from "@/hooks/useInterval";

// Ours - Utils
import { timeInWords } from "@/utils/time";

// Ours - Types
import { getWorkoutElapsed } from "@/types/workout";

// Ours - Components
import Button from "@/components/form/Button";
import TimeDisplay from "@/components/ui/TimeDisplay";

// Ours - Styles
import styles from "./WorkoutSummary.module.css";

const WorkoutSummary = ({ workout, clock }) => {
  const { plan } = workout;

  const [elapsed, setElapsed] = useState(0);

  const totalWork = plan.reduce(
    (acc, current) => acc + current.rounds * current.workDuration,
    0,
  );
  const totalRest = plan.reduce(
    (acc, current) => acc + current.rounds * current.restDuration,
    0,
  );

  const totalTime = totalWork + totalRest;
  const remainingTime = totalTime - elapsed;

  useInterval(() => {
    setElapsed(getWorkoutElapsed({ workout, clock }));
  }, 20);

  return (
    <div className={styles["workout-summary"]}>
      <div className={styles["tallies"]}>
        <div>Work Time</div>
        <div>{timeInWords(totalWork)}</div>
        <div>Rest Time</div>
        <div>{timeInWords(totalRest)}</div>
        <div>Total Time</div>
        <div>{timeInWords(totalTime)}</div>
        <div className={styles["remaining-row"]}>Remaining</div>
        <div className={styles["remaining-row"]}>
          <TimeDisplay timeMs={remainingTime} />
        </div>
      </div>
      <div>
        <Button to="/add">Add Timer</Button>
      </div>
    </div>
  );
};

export default WorkoutSummary;
