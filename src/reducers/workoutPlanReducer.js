// React
import { useReducer } from "react";

/**
 * @typedef {Object} WorkoutPlanState
 * @property {import("@/types/timer").TimerOptions[]} plan
 * @property {import("@/types/timer").TimerOptions | null} currentTimerOptions
 * @property {boolean} isLastTimer
 * @property {boolean} isFirstTimer
 */

/**
 * Possible action types for workoutPlanReducer
 *
 * @enum {string}
 * @readonly
 */
const WorkoutPlanActionType = {
  ADD_TIMER: "addTimer",
  REMOVE_TIMER: "removeTimer",
  NEXT_TIMER: "nextTimer",
  PREV_TIMER: "prevTimer",
  GOTO_FIRST_TIMER: "gotoFirstTimer",
};

/**
 * Default state for workoutPlanReducer
 */
const initialState = {
  plan: [],
  cursor: 0,
};

/**
 * Creates an action that adds a timer to the plan, given a TimerOptions object
 *
 * @param {Object} params
 * @param {import("@/types/timer").TimerOptions} params.options
 * @returns {{type: WorkoutPlanActionType, payload: {options: import("@/types/timer").TimerOptions}}}
 */
export const addTimer = ({ options }) => ({
  type: WorkoutPlanActionType.ADD_TIMER,
  payload: { options },
});

/**
 * Creates an action that removes a timer from the plan, given its id
 *
 * @param {Object} params
 * @param {string} params.id
 * @returns {{type: WorkoutPlanActionType, payload: {id: string}}}
 */
export const removeTimer = ({ id }) => ({
  type: WorkoutPlanActionType.REMOVE_TIMER,
  payload: { id },
});

/**
 * Creates an action that moves to the next timer
 *
 * @returns {{type: WorkoutPlanActionType}}
 */
export const nextTimer = () => ({ type: WorkoutPlanActionType.NEXT_TIMER });

/**
 * Creates an action that moves to the previous timer
 *
 * @returns {{type: WorkoutPlanActionType}}
 */
export const prevTimer = () => ({ type: WorkoutPlanActionType.PREV_TIMER });

/**
 * Creates an action that moves to the first timer
 *
 * @returns {{type: WorkoutPlanActionType}}
 */
export const gotoFirstTimer = () => ({
  type: WorkoutPlanActionType.GOTO_FIRST_TIMER,
});

/**
 * @param {typeof initialState} state
 * @param {Object} action
 * @param {WorkoutPlanActionType} action.type
 * @param {any} [action.payload]
 */
const workoutPlanReducer = (state, action) => {
  switch (action.type) {
    case WorkoutPlanActionType.ADD_TIMER: {
      const { options } = action.payload;
      const plan = [...state.plan, options];

      return { ...state, plan };
    }

    case WorkoutPlanActionType.REMOVE_TIMER: {
      const { id } = action.payload;
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
    case WorkoutPlanActionType.NEXT_TIMER: {
      return {
        ...state,
        cursor: Math.min(state.cursor + 1, state.plan.length - 1),
      };
    }
    case WorkoutPlanActionType.PREV_TIMER: {
      return {
        ...state,
        cursor: Math.max(state.cursor - 1, 0),
      };
    }
    case WorkoutPlanActionType.GOTO_FIRST_TIMER: {
      return {
        ...state,
        cursor: 0,
      };
    }
    default: {
      throw Error("Unknown action received by clockReducer: " + action.type);
    }
  }
};

/**
 * Use the clock reducer, which manages internal time. Must be dispatched ticks.
 *
 * @returns {[WorkoutPlanState, function({type: WorkoutPlanActionType, [payload: any]})]}
 */

export const useWorkoutPlanReducer = () => {
  const [state, dispatch] = useReducer(workoutPlanReducer, initialState);

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
