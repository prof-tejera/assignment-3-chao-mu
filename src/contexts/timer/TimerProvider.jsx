// React
import { useState, useEffect } from "react";

// Ours - Contexts
import TimerContext from "./TimerContext";
import usePlanContext from "@/contexts/plan/usePlanContext";

// Ours - Types
import {
  createTimerSnapshot,
  TimerState,
  getTotalDuration,
} from "@/types/timer";

// Ours - Reducers
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

const TimerProvider = ({ children }) => {
  const [timerSnapshot, setTimerSnapshot] = useState(null);
  const [lastTimerId, setLastTimerId] = useState(null);

  const { currentTimerOptions, plan, signalCompleted } = usePlanContext();

  const [clockState, clockDispatch] = useClockReducer();
  const { transpired, paused } = clockState;

  useEffect(() => {
    if (currentTimerOptions === null) {
      return;
    }

    if (lastTimerId !== currentTimerOptions.id) {
      // Do not change pause state.
      clockDispatch(paused ? resetClock() : restartClock());

      setLastTimerId(currentTimerOptions.id);
    }
  }, [currentTimerOptions, clockDispatch, lastTimerId, paused]);

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
        signalCompleted();
      }
    },
    clockState,
    clockDispatch,
  );

  const provided = {
    timerSnapshot,
    playTimer: () => {
      clockDispatch(resumeClock());
    },
    pauseTimer: () => {
      clockDispatch(pauseClock());
    },
    restartTimer: () => {
      clockDispatch(restartClock());
    },
    resetTimer: () => {
      clockDispatch(resetClock());
    },
    fastForwardTimer: () => {
      if (currentTimerOptions === null) {
        return;
      }

      clockDispatch(
        setTranspired({
          transpired: getTotalDuration(currentTimerOptions),
        }),
      );
    },
  };

  return (
    <TimerContext.Provider value={provided}>{children}</TimerContext.Provider>
  );
};

export default TimerProvider;
