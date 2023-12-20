// React
import { createContext, useContext, useCallback } from "react";

// Ours - Contexts
import { useClockDispatchContext } from "./ClockContext";
import { useWorkoutContext, useWorkoutDispatchContext } from "./WorkoutContext";
import * as Workout from "@/types/workout";
import { WorkoutActionType } from "@/reducers/workoutReducer";
import { ClockActionType } from "@/reducers/clockReducer";

// Ours - Types
import { getTotalDuration } from "@/types/timer";

const WorkoutManagementContext = createContext(null);

/**
 * @typedef {Object} WorkoutManagement
 * @property {function(): void} fastBackwardTimer
 * @property {function(): void} fastForwardTimer
 * @property {function(): void} pauseTimer
 * @property {function(): void} resumeTimer
 * @property {function(): void} resetTimer
 * @property {function(): void} resetCurrentTimer
 * @property {function({id: string}): void} signalTimerCompleted
 * @property {function(): void} nextTimer
 * @property {function(): void} resetWorkout
 * @property {(options: import('@/types/timer').TimerOptions) => void} addTimer
 * @property {(options: import('@/types/timer').TimerOptions) => void} updateTimer
 * @property {function({id: string}): void} removeTimer
 */

/** @returns {WorkoutManagement} */
export const useWorkoutManagementContext = () => {
  const context = useContext(WorkoutManagementContext);
  if (!context) {
    throw new Error(
      "useWorkoutManagementContext must be used within a WorkoutManagementProvider",
    );
  }

  return context;
};

export const WorkoutManagementProvider = ({ children }) => {
  const clockDispatch = useClockDispatchContext();

  const workoutDispatch = useWorkoutDispatchContext();
  const workout = useWorkoutContext();
  const { completed } = workout;

  const currentTimerOptions = Workout.getCurrentTimer(workout);
  const currentTimerId = currentTimerOptions?.id;
  const isLastTimer = Workout.isLastTimer(workout);
  const totalTimerDuration = getTotalDuration(currentTimerOptions);

  /** @type {WorkoutManagement} */
  const workoutManagement = {
    addTimer: useCallback(
      (options) => {
        workoutDispatch({
          type: WorkoutActionType.ADD_TIMER,
          payload: { options },
        });

        if (completed) {
          clockDispatch({
            type: ClockActionType.SET_ELAPSED,
            payload: { elapsed: 0 },
          });

          workoutDispatch({
            type: WorkoutActionType.NEXT_TIMER,
          });
        }
      },
      [clockDispatch, workoutDispatch, completed],
    ),

    updateTimer: useCallback(
      (options) => {
        workoutDispatch({
          type: WorkoutActionType.UPDATE_TIMER,
          payload: { options },
        });
      },
      [workoutDispatch],
    ),

    signalTimerCompleted: useCallback(
      ({ id }) => {
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
      },
      [clockDispatch, workoutDispatch, isLastTimer],
    ),
    pauseTimer: useCallback(() => {
      clockDispatch({ type: ClockActionType.PAUSE });
    }, [clockDispatch]),
    resumeTimer: useCallback(() => {
      clockDispatch({ type: ClockActionType.RESUME });
    }, [clockDispatch]),
    resetTimer: useCallback(() => {
      clockDispatch({
        type: ClockActionType.RESET,
      });
      workoutDispatch({
        type: WorkoutActionType.TIMER_RESET,
        payload: { id: currentTimerId },
      });
    }, [clockDispatch, workoutDispatch, currentTimerId]),
    resetCurrentTimer: useCallback(() => {
      clockDispatch({
        type: ClockActionType.SET_ELAPSED,
        payload: { elapsed: 0 },
      });
    }, [clockDispatch]),
    nextTimer: useCallback(() => {
      workoutDispatch({
        type: WorkoutActionType.NEXT_TIMER,
      });
    }, [workoutDispatch]),
    resetWorkout: useCallback(() => {
      clockDispatch({
        type: ClockActionType.RESET,
      });

      workoutDispatch({
        type: WorkoutActionType.GOTO_FIRST_TIMER,
      });
    }, [clockDispatch, workoutDispatch]),
    removeTimer: useCallback(
      ({ id }) => {
        workoutDispatch({
          type: WorkoutActionType.REMOVE_TIMER,
          payload: { id },
        });

        clockDispatch({
          type: ClockActionType.SET_ELAPSED,
          payload: { elapsed: 0 },
        });
      },
      [clockDispatch, workoutDispatch],
    ),
    fastBackwardTimer: useCallback(() => {
      clockDispatch({
        type: ClockActionType.SET_ELAPSED,
        payload: { elapsed: 0 },
      });
      workoutDispatch({ type: WorkoutActionType.PREV_TIMER });
    }, [clockDispatch, workoutDispatch]),
    fastForwardTimer: useCallback(() => {
      if (isLastTimer) {
        clockDispatch({
          type: ClockActionType.SET_ELAPSED,
          payload: { elapsed: totalTimerDuration },
        });
        clockDispatch({ type: ClockActionType.PAUSE });
      } else {
        clockDispatch({
          type: ClockActionType.SET_ELAPSED,
          payload: { elapsed: 0 },
        });
        workoutDispatch({ type: WorkoutActionType.NEXT_TIMER });
      }
    }, [clockDispatch, workoutDispatch, isLastTimer, totalTimerDuration]),
  };

  return (
    <WorkoutManagementContext.Provider value={workoutManagement}>
      {children}
    </WorkoutManagementContext.Provider>
  );
};
