import TimeDisplay from "@/components/ui/TimeDisplay";

// Ours - Styles
import styles from "./TimerPreview.module.css";

import { hasTimerFeature } from "@/types/timer";

const TimerPreview = ({ options }) => (
  <span className={styles["timer-preview"]}>
    <span>{options.type}</span>
    <span>
      <TimeDisplay timeMs={options.workDuration} />
      {hasTimerFeature(options.type, "rounds") && `x${options.rounds}`}
    </span>
    {options.restDuration > 0 && (
      <span>
        (rest: <TimeDisplay timeMs={options.restDuration} />)
      </span>
    )}
  </span>
);

export default TimerPreview;
