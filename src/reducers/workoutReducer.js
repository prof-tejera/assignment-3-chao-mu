// React
import { useReducer } from "react";

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
  const nextTimer = (state) => ({
    ...state,
    cursor: Math.min(state.cursor + 1, state.plan.length - 1),
  });

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
      const index = state.plan.findIndex((timer) => timer.id === id);

      // If the current cursor is on or after the index, this will cause our current timer to jump
      // forwards, so we need to adjust, unless we want it to jump forward (e.g. we're removingt the current timer)
      let cursor = state.cursor > index ? state.cursor - 1 : state.cursor;

      const plan = [
        ...state.plan.slice(0, index),
        ...state.plan.slice(index + 1),
      ];

      // This however may have put us out of bounds, so we  might need to adjust
      cursor = Math.max(0, Math.min(plan.length - 1, cursor));

      return { ...state, plan, cursor };
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

  const { plan, cursor } = state;
  const isLastTimer = cursor >= plan.length - 1;
  const isFirstTimer = cursor <= 0;

  const currentTimerOptions = plan[cursor] || null;

  const exposedState = {
    ...state,
    currentTimerOptions,
    isLastTimer,
    isFirstTimer,
  };

  return [exposedState, dispatch];
};
