import styles from "./WorkoutSummary.module.css";

import { timeInWords } from "@/utils/time";

import Button from "@/components/form/Button";

const WorkoutSummary = ({ plan }) => {
  const totalWork = plan.reduce(
    (acc, current) => acc + current.rounds * current.workDuration,
    0,
  );
  const totalRest = plan.reduce(
    (acc, current) => acc + current.rounds * current.restDuration,
    0,
  );
  return (
    <div className={styles["workout-summary"]}>
      <div>
        <div>Work Time</div>
        <div>{timeInWords(totalWork)}</div>
        <div>Rest Time</div>
        <div>{timeInWords(totalRest)}</div>
        <div>Total Time</div>
        <div>{timeInWords(totalWork + totalRest)}</div>
      </div>
      <div>
        <Button to="/add">Add Timer</Button>
      </div>
    </div>
  );
};

export default WorkoutSummary;
