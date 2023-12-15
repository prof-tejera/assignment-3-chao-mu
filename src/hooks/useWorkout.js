// React
import { useState } from "react";

// Ours - Types
import {
  createTimerSnapshot,
  TimerState,
  getTotalDuration,
} from "@/types/timer";

// Ours - Reducers
import {
  useWorkoutPlanReducer,
  nextTimer,
  prevTimer,
  addTimer,
  removeTimer,
  gotoFirstTimer,
} from "@/reducers/workoutPlanReducer";

import {
  useClockReducer,
  restartClock,
  resetClock,
  resumeClock,
  setTranspired,
  pauseClock,
} from "@/reducers/clockReducer";

// Ours - Hokes
import useSyncClock from "@/hooks/useSyncClock";

export default () => {
  const [timerSnapshot, setTimerSnapshot] = useState(null);

  const [{ currentTimerOptions, isLastTimer, plan }, workoutPlanDispatch] =
    useWorkoutPlanReducer();

  const [clockState, clockDispatch] = useClockReducer();
  const { transpired, paused } = clockState;

  // Maintain the pause value when changing timers
  const resetOrRestart = () => {
    const action = paused ? resetClock() : restartClock();

    clockDispatch(action);
  };

  const dispatchNextTimer = () => {
    workoutPlanDispatch(nextTimer());
    resetOrRestart();
  };

  const dispatchPrevTimer = () => {
    workoutPlanDispatch(prevTimer());
    resetOrRestart();
  };

  // Callback is called at least every tick, whether or not the clock is paused.
  // Transpired only increases when the clock is not paused.
  useSyncClock(
    () => {
      if (!paused && plan.length === 0) {
        clockDispatch(resetClock());
        return;
      }

      if (currentTimerOptions === null) {
        setTimerSnapshot(null);
        return;
      }

      const updatedSnapshot = createTimerSnapshot({
        transpired,
        active: !paused,
        options: currentTimerOptions,
      });

      setTimerSnapshot(updatedSnapshot);

      const { state: updatedState } = updatedSnapshot.progress;

      // Move on to the next if there is another one to move on to
      if (updatedState === TimerState.COMPLETED) {
        if (!isLastTimer) {
          dispatchNextTimer();
        } else if (!paused) {
          clockDispatch(pauseClock());
        }
      }
    },
    clockState,
    clockDispatch,
  );

  return {
    plan,
    timerSnapshot,
    restartTimer: () => {
      clockDispatch(restartClock());
    },
    pauseWorkout: () => {
      clockDispatch(pauseClock());
    },
    resumeWorkout: () => {
      clockDispatch(resumeClock());
    },
    resetTimer: () => {
      clockDispatch(resetClock());
    },
    fastForwardTimer: () => {
      if (currentTimerOptions === null) {
        return;
      }

      if (isLastTimer) {
        clockDispatch(
          setTranspired({
            transpired: getTotalDuration(timerSnapshot.options),
          }),
        );
      } else {
        dispatchNextTimer();
      }
    },
    fastBackwardTimer: () => {
      dispatchPrevTimer();
    },
    resetWorkout: () => {
      workoutPlanDispatch(gotoFirstTimer());
      clockDispatch(resetClock());
    },
    removeTimer: (id) => {
      if (currentTimerOptions && currentTimerOptions.id === id) {
        resetOrRestart();
      }

      workoutPlanDispatch(removeTimer({ id }));
    },
    addTimer: (options) => {
      workoutPlanDispatch(addTimer({ options }));
    },
  };
};
