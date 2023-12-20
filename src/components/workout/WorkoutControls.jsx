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
import { useWorkoutContext } from "@/contexts/WorkoutContext";

import { useClockContext } from "@/contexts/ClockContext";

import { useWorkoutManagementContext } from "@/contexts/WorkoutManagementContext";

// Ours - Components
import Button from "@/components/form/Button";
import Hide from "@/components/ui/Hide";

const WorkoutControls = () => {
  const { completed } = useWorkoutContext();
  const { paused } = useClockContext();

  const workoutManagement = useWorkoutManagementContext();

  return (
    <div className={styles["workout-controls"]}>
      <div className={styles["workout-controls__basic"]}>
        <Button
          onClick={() => workoutManagement.fastBackwardTimer()}
          tooltip="Go to the previous timer, or reset if first timer."
        >
          <IoMdSkipBackward />
        </Button>
        {paused && !completed && (
          <Button
            onClick={() => workoutManagement.resumeTimer()}
            tooltip="Resume the workout"
          >
            <IoMdPlay />
          </Button>
        )}
        {!paused && !completed && (
          <Button
            onClick={() => workoutManagement.pauseTimer()}
            tooltip="Pause the workout"
          >
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
          onClick={() => workoutManagement.fastForwardTimer()}
          tooltip="Go to the next timer, or mark this one complete if it's the last"
        >
          <IoMdSkipForward />
        </Button>
      </div>
      <div className={styles["workout-controls__resets"]}>
        <Button
          onClick={() => workoutManagement.resetTimer()}
          tooltip="Return to the beginning of the timer"
        >
          Reset Timer
        </Button>
        <Button
          onClick={() => workoutManagement.resetWorkout()}
          tooltip="Return to the beginning of the workout"
        >
          Reset Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutControls;
