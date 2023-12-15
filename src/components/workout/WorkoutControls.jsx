// react-icons
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipForward,
  IoMdSkipBackward,
} from "react-icons/io";

// Ours - Style
import styles from "./WorkoutControls.module.css";

// Ours - Context
import useTimerContext from "@/contexts/timer/useTimerContext";
import usePlanContext from "@/contexts/plan/usePlanContext";

// Ours - Types
import { TimerState } from "@/types/timer";

// Ours - Components
import Button from "@/components/form/Button";
import Hide from "@/components/ui/Hide";

const WorkoutControls = () => {
  const { timerSnapshot, pauseTimer, playTimer, resetTimer, fastForwardTimer } =
    useTimerContext();

  const { resetWorkout, prevTimer } = usePlanContext();

  const state = timerSnapshot.progress.state;

  return (
    <div className={styles["workout-controls"]}>
      <div className={styles["workout-controls__basic"]}>
        <Button
          onClick={() => prevTimer()}
          tooltip="Go to the previous timer, or reset if first timer."
        >
          <IoMdSkipBackward />
        </Button>
        {state === TimerState.STOPPED && (
          <Button onClick={() => playTimer()} tooltip="Resume the workout">
            <IoMdPlay />
          </Button>
        )}
        {state === TimerState.RUNNING && (
          <Button onClick={() => pauseTimer()} tooltip="Pause the workout">
            <IoMdPause />
          </Button>
        )}
        {state === TimerState.COMPLETED && (
          <Hide>
            <Button>
              <IoMdPause />
            </Button>
          </Hide>
        )}
        <Button
          onClick={() => fastForwardTimer()}
          tooltip="Go to the next timer, or mark this one complete if it's the last"
        >
          <IoMdSkipForward />
        </Button>
      </div>
      <div className={styles["workout-controls__resets"]}>
        <Button
          onClick={resetTimer}
          tooltip="Return to the beginning of the timer"
        >
          Reset Timer
        </Button>
        <Button
          onClick={resetWorkout}
          tooltip="Return to the beginning of the workout"
        >
          Reset Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutControls;
