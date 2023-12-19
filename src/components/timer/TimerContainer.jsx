// React
import { useState } from "react";

// Ours - Components
import TimerDisplay from "@/components/timer/TimerDisplay";

// Ours - Context
import { useClockContext } from "@/contexts/ClockContext";
import {
  useWorkoutContext,
  useWorkoutDispatchContext,
} from "@/contexts/WorkoutContext";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";

// Ours - Hooks
import useInterval from "@/hooks/useInterval";

// Ours - Types
import { createTimerSnapshot, TimerStatus } from "@/types/timer";

const TimerContainer = () => {
  const clock = useClockContext();

  const { currentTimerOptions } = useWorkoutContext();
  const workoutDispatch = useWorkoutDispatchContext();
  const [timerSnapshot, setTimerSnapshot] = useState(null);

  useInterval(() => {
    const updatedTimerSnapshot = createTimerSnapshot({
      clock,
      options: currentTimerOptions,
    });

    const {
      progress: { status, id },
    } = updatedTimerSnapshot;

    if (status == TimerStatus.COMPLETED) {
      workoutDispatch({
        type: WorkoutActionType.TIMER_COMPLETED,
        payload: { id },
      });
    }

    setTimerSnapshot(updatedTimerSnapshot);
  }, 20);

  if (!timerSnapshot) {
    return false;
  }

  return <TimerDisplay timerSnapshot={timerSnapshot} />;
};

export default TimerContainer;
