// React
import { useState, useEffect } from "react";

// Ours - Components
import TimerDisplay from "@/components/timer/TimerDisplay";

// Ours - Context
import { useClockContext } from "@/contexts/ClockContext";
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useWorkoutManagementContext } from "@/contexts/WorkoutManagementContext";

// Ours - Hooks
import useInterval from "@/hooks/useInterval";

// Ours - Types
import { createTimerSnapshot, TimerStatus } from "@/types/timer";
import { getCurrentTimer } from "@/types/workout";

const TimerContainer = () => {
  const clock = useClockContext();

  const workout = useWorkoutContext();
  const currentTimerOptions = getCurrentTimer(workout);

  const { pauseTimer, signalTimerCompleted } = useWorkoutManagementContext();

  const [timerSnapshot, setTimerSnapshot] = useState(() =>
    createTimerSnapshot({
      clock,
      options: currentTimerOptions,
    }),
  );

  // Pause timer on unmount - bug waiting to happen if pauseTimer changes unexpectedly
  useEffect(() => {
    return () => pauseTimer();
  }, [pauseTimer]);

  useInterval(() => {
    const updatedTimerSnapshot = createTimerSnapshot({
      clock,
      options: currentTimerOptions,
    });

    const {
      progress: { status, id },
    } = updatedTimerSnapshot;

    if (status == TimerStatus.COMPLETED) {
      signalTimerCompleted({ id });
    }

    setTimerSnapshot(updatedTimerSnapshot);
  }, 20);

  if (!timerSnapshot) {
    return false;
  }

  return <TimerDisplay timerSnapshot={timerSnapshot} />;
};

export default TimerContainer;
