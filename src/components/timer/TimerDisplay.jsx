// Ours - Components
import Progress from "@/components/ui/Progress";
import TimeDisplay from "@/components/ui/TimeDisplay";
import TimerDisplayPanel from "@/components/timer/TimerDisplayPanel";

// Ours - Types
import { hasTimerFeature, TimerStatus } from "@/types/timer";

// Ours - Style
import styles from "./TimerDisplay.module.css";

const TimerDisplay = ({ timerSnapshot: { options, progress } }) => {
  const { rounds, type, countUp, description } = options;
  const {
    round,
    roundElapsed,
    isWorking,
    roundDuration,
    status,
    roundProgress,
    totalProgress,
  } = progress;

  let displayStatus = "";
  if (status == TimerStatus.RUNNING) {
    displayStatus = isWorking ? "Work!" : "Rest";
  } else if (status == TimerStatus.STOPPED) {
    displayStatus = "Paused";
  } else if (status == TimerStatus.COMPLETED) {
    displayStatus = "Completed";
  } else {
    throw new Error(
      `Unable to calculate timer display status. status=${status}, isWorking=${isWorking}`,
    );
  }

  const displayedElapsed = countUp
    ? roundElapsed
    : roundDuration - roundElapsed;

  const hasRoundFeature = hasTimerFeature(type, "rounds");

  return (
    <section className={styles["timer-display"]}>
      <TimerDisplayPanel>
        <div className={styles["header"]}>
          <div className={styles["type"]}>{type}</div>
        </div>
        <div className={[styles["featured"]].join(" ")}>
          <div className={styles["time"]}>
            <TimeDisplay timeMs={displayedElapsed} showMs />
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
      {description ? (
        <div className={styles["description"]}>{description}</div>
      ) : (
        <div className={styles["description-placeholder"]}>
          No description provided
        </div>
      )}
    </section>
  );
};

export default TimerDisplay;
