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
import {
  useWorkoutDispatchContext,
  useWorkoutContext,
} from "@/contexts/WorkoutContext";

import {
  useClockContext,
  useClockDispatchContext,
} from "@/contexts/ClockContext";

// Ours - Types
import { getTotalDuration } from "@/types/timer";
import { isLastTimer, getCurrentTimer } from "@/types/workout";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";
import { ClockActionType } from "@/reducers/clockReducer";

// Ours - Components
import Button from "@/components/form/Button";
import Hide from "@/components/ui/Hide";

const WorkoutControls = () => {
  const workout = useWorkoutContext();
  const { completed } = workout;

  const { paused } = useClockContext();
  const workoutDispatch = useWorkoutDispatchContext();
  const clockDispatch = useClockDispatchContext();

  const currentTimerOptions = getCurrentTimer(workout);

  const fastBackwardTimer = () => {
    clockDispatch({
      type: ClockActionType.SET_ELAPSED,
      payload: { elapsed: 0 },
    });
    workoutDispatch({ type: WorkoutActionType.PREV_TIMER });
  };

  const fastForwardTimer = () => {
    if (isLastTimer(workout)) {
      clockDispatch({
        type: ClockActionType.SET_ELAPSED,
        payload: { elapsed: getTotalDuration(currentTimerOptions) },
      });
      clockDispatch({ type: ClockActionType.PAUSE });
    } else {
      clockDispatch({
        type: ClockActionType.SET_ELAPSED,
        payload: { elapsed: 0 },
      });
      workoutDispatch({ type: WorkoutActionType.NEXT_TIMER });
    }
  };

  const resetTimer = () => {
    clockDispatch({
      type: ClockActionType.RESET,
    });
    workoutDispatch({
      type: WorkoutActionType.TIMER_RESET,
      payload: { id: currentTimerOptions.id },
    });
  };

  const resetWorkout = () => {
    clockDispatch({
      type: ClockActionType.RESET,
    });

    workoutDispatch({
      type: WorkoutActionType.GOTO_FIRST_TIMER,
    });
  };

  const pauseTimer = () => {
    clockDispatch({ type: ClockActionType.PAUSE });
  };

  const resumeTimer = () => {
    clockDispatch({ type: ClockActionType.RESUME });
  };

  return (
    <div className={styles["workout-controls"]}>
      <div className={styles["workout-controls__basic"]}>
        <Button
          onClick={() => fastBackwardTimer()}
          tooltip="Go to the previous timer, or reset if first timer."
        >
          <IoMdSkipBackward />
        </Button>
        {paused && !completed && (
          <Button onClick={() => resumeTimer()} tooltip="Resume the workout">
            <IoMdPlay />
          </Button>
        )}
        {!paused && !completed && (
          <Button onClick={() => pauseTimer()} tooltip="Pause the workout">
            <IoMdPause />
          </Button>
        )}
        {completed && (
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
