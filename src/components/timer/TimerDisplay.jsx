// Ours - Components
import Progress from "@/components/ui/Progress";
import TimeDisplay from "@/components/ui/TimeDisplay";
import TimerDisplayPanel from "@/components/timer/TimerDisplayPanel";

// Ours - Types
import { hasTimerFeature, TimerState } from "@/types/timer";

// Ours - Style
import styles from "./TimerDisplay.module.css";

const TimerDisplay = ({ timerSnapshot }) => {
  const { options, progress } = timerSnapshot;
  const { rounds, type, countUp } = options;
  const {
    round,
    roundTranspired,
    isWorking,
    roundDuration,
    state,
    roundProgress,
    totalProgress,
  } = progress;

  let displayStatus = "";
  if (state == TimerState.RUNNING) {
    displayStatus = isWorking ? "Work!" : "Rest";
  } else if (state == TimerState.STOPPED) {
    displayStatus = "Paused";
  } else if (state == TimerState.COMPLETED) {
    displayStatus = "Completed";
  } else {
    throw new Error(
      `Unable to calculate timer display state. state=${state}, isWorking=${isWorking}`,
    );
  }

  const displayedTranspired = countUp
    ? roundTranspired
    : roundDuration - roundTranspired;

  const hasRoundFeature = hasTimerFeature(type, "rounds");

  return (
    <TimerDisplayPanel>
      <div className={styles["header"]}>
        <div className={styles["type"]}>{type}</div>
      </div>
      <div className={[styles["featured"]].join(" ")}>
        <div className={styles["time"]}>
          <TimeDisplay timeMs={displayedTranspired} showMs />
        </div>
        <div className={styles["status"]}>{displayStatus}</div>
      </div>

      <div className={styles["subgroup"]}>
        {hasRoundFeature && (
          <div className={styles["rounds"]}>
            Round {round} of {rounds}
          </div>
        )}
        <div className={styles["progress"]}>
          {hasRoundFeature && <Progress max={1} value={roundProgress} />}
          <Progress max={1} value={totalProgress} />
        </div>
      </div>
    </TimerDisplayPanel>
  );
};

export default TimerDisplay;
