// React
import { useState, useEffect } from "react";

// Ours - Components
import TimerDisplay from "@/components/timer/TimerDisplay";

// Ours - Context
import {
  useClockContext,
  useClockDispatchContext,
} from "@/contexts/ClockContext";

import {
  useWorkoutContext,
  useWorkoutDispatchContext,
} from "@/contexts/WorkoutContext";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";
import { ClockActionType } from "@/reducers/clockReducer";

// Ours - Hooks
import useInterval from "@/hooks/useInterval";

// Ours - Types
import { createTimerSnapshot, TimerStatus } from "@/types/timer";
import { isLastTimer, getCurrentTimer } from "@/types/workout";

const TimerContainer = () => {
  const clock = useClockContext();
  const clockDispatch = useClockDispatchContext();

  const workout = useWorkoutContext();
  const currentTimerOptions = getCurrentTimer(workout);

  const workoutDispatch = useWorkoutDispatchContext();
  const [timerSnapshot, setTimerSnapshot] = useState(() =>
    createTimerSnapshot({
      clock,
      options: currentTimerOptions,
    }),
  );

  // Pause timer on unmount
  useEffect(() => {
    return () => {
      clockDispatch({ type: ClockActionType.PAUSE });
    };
  }, [clockDispatch]);

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

      if (!isLastTimer) {
        clockDispatch({
          type: ClockActionType.SET_ELAPSED,
          payload: { elapsed: 0 },
        });
      }
    }

    setTimerSnapshot(updatedTimerSnapshot);
  }, 20);

  if (!timerSnapshot) {
    return false;
  }

  return <TimerDisplay timerSnapshot={timerSnapshot} />;
};

export default TimerContainer;
