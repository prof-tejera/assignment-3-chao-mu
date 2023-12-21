// Ours - Types
import {
  removeTimer,
  nextTimer,
  signalTimerCompleted,
  signalTimerReset,
} from "@/types/workout";

/**
 * Possible action types for workoutReducer
 *
 * @enum {string}
 * @readonly
 */
export const WorkoutActionType = {
  ADD_TIMER: "addTimer",
  REMOVE_TIMER: "removeTimer",
  NEXT_TIMER: "nextTimer",
  PREV_TIMER: "prevTimer",
  UPDATE_TIMER: "updateTimer",
  TIMER_COMPLETED: "timerCompleted",
  TIMER_RESET: "timerReset",
  GOTO_FIRST_TIMER: "gotoFirstTimer",
};

/**
 * @param {import("@/types/workout").Workout} state
 * @param {Object} action
 * @param {WorkoutActionType} action.type
 * @param {any} [action.payload]
 */
export const workoutReducer = (state, { type, payload }) => {
  switch (type) {
    case WorkoutActionType.TIMER_COMPLETED: {
      const { id } = payload;

      return signalTimerCompleted(state, { id });
    }
    case WorkoutActionType.TIMER_RESET: {
      const { id } = payload;

      return signalTimerReset(state, { id });
    }
    case WorkoutActionType.ADD_TIMER: {
      const { options } = payload;
      const plan = [...state.plan, options];

      return { ...state, plan, completed: false };
    }
    case WorkoutActionType.REMOVE_TIMER: {
      const { id } = payload;

      return removeTimer(state, { id });
    }
    case WorkoutActionType.NEXT_TIMER: {
      return nextTimer(state);
    }
    case WorkoutActionType.PREV_TIMER: {
      return {
        ...state,
        cursor: Math.max(state.cursor - 1, 0),
        completed: false,
      };
    }
    case WorkoutActionType.GOTO_FIRST_TIMER: {
      return {
        ...state,
        cursor: 0,
        completed: false,
      };
    }
    case WorkoutActionType.UPDATE_TIMER: {
      const { options } = payload;
      const index = state.plan.findIndex((timer) => timer.id === options.id);

      if (index === -1) {
        throw Error(`Timer with id "${options.id}" is not found`);
      }

      const plan = [
        ...state.plan.slice(0, index),
        options,
        ...state.plan.slice(index + 1),
      ];

      return { ...state, plan };
    }
    default: {
      throw Error("Unknown action received by workoutReducer: " + type);
    }
  }
};
