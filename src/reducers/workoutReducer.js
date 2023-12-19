// React
import { useReducer } from "react";

// Ours - Types
import { createWorkout, removeTimer, nextTimer } from "@/types/workout";

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
  GOTO_FIRST_TIMER: "reset",
};

/**
 * Default state for workoutReducer
 */
const initialState = {
  plan: [],
  cursor: 0,
  completed: false,
};

/**
 * @param {typeof initialState} state
 * @param {Object} action
 * @param {WorkoutActionType} action.type
 * @param {any} [action.payload]
 */
const workoutReducer = (state, { type, payload }) => {
  switch (type) {
    case WorkoutActionType.TIMER_COMPLETED: {
      const { plan, cursor } = state;
      const { id } = payload;

      if (plan.length > 0 && plan[cursor].id === id) {
        return nextTimer(state);
      }

      return state;
    }
    case WorkoutActionType.ADD_TIMER: {
      const { options } = payload;
      const plan = [...state.plan, options];

      return { ...state, plan, completed: false };
    }
    case WorkoutActionType.REMOVE_TIMER: {
      const { id } = payload;

      return removeTimer({ state, id });
    }
    case WorkoutActionType.NEXT_TIMER: {
      return nextTimer(state);
    }
    case WorkoutActionType.PREV_TIMER: {
      return {
        ...state,
        cursor: Math.max(state.cursor - 1, 0),
      };
    }
    case WorkoutActionType.GOTO_FIRST_TIMER: {
      return {
        ...state,
        cursor: 0,
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

/**
 * Use the workout reducer, which manages internal time. Must be dispatched ticks.
 *
 * @returns {[import("@/types/workout").Workout, function({type: WorkoutActionType, [payload: any]})]}
 */
export const useWorkoutReducer = () => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  return [createWorkout(state), dispatch];
};
