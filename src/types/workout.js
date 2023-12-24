// uuid
import { v4 as uuidv4 } from "uuid";

// Ours - Types
import { getElapsed } from "./clock";
import { getTotalDuration } from "./timer";

// Ours - Utils
import { sum } from "@/utils/math";

/**
 * @typedef {Object} Workout
 * @property {Array<import("./timer").TimerOptions>} plan
 * @property {number} cursor
 * @property {boolean} completed
 * @property {number} [completedAt]
 * @property {string} id
 */

/**
 * @returns {Workout}
 */
export const createWorkout = () => ({
  plan: [],
  cursor: 0,
  completed: false,
  id: uuidv4(),
});

/**
 * @param {Workout} workout
 * @returns {boolean}
 */
export const isLastTimer = ({ plan, cursor }) => {
  return cursor >= plan.length - 1;
};

/**
 * @param {Workout} workout
 * @returns {boolean}
 */
export const isFirstTimer = ({ cursor }) => {
  return cursor <= 0;
};

/**
 * @param {Workout} workout
 * @param {Object} params
 * @param {string} params.id
 * @returns {Workout}
 */
export const removeTimer = (workout, { id }) => {
  const { plan, cursor } = workout;
  const index = plan.findIndex((timer) => timer.id === id);

  if (index === -1) {
    throw new Error(`Timer with id ${id} not found in plan`);
  }

  // Did we remove the last cursor?
  if (plan.length === 1) {
    return {
      ...workout,
      plan: [],
      cursor: 0,
    };
  }

  let updatedCursor = null;

  // Did we remove a cursor before the current?
  if (cursor > index) {
    updatedCursor = cursor - 1;
  }
  // Did we remove the timer after the current?
  else if (cursor < index) {
    updatedCursor = cursor;
  }
  // Did we remove the current cursor?
  else if (cursor === index) {
    if (index === plan.length - 1) {
      updatedCursor = cursor - 1;
    } else if (index === 0) {
      updatedCursor = cursor;
    }
  }

  const updatedPlan = [...plan.slice(0, index), ...plan.slice(index + 1)];

  return { ...workout, plan: updatedPlan, cursor: updatedCursor };
};

/**
 * Signal that timer has been reset
 *
 * @param {Workout} workout
 * @param {Object} params
 * @param {string} params.id Timer id
 * @returns {Workout}
 */
export const signalTimerReset = (workout, { id }) => {
  const { plan, cursor } = workout;

  // Are there no timers?
  if (plan.length > 0 && plan[cursor].id === id) {
    return {
      ...workout,
      completed: false,
    };
  }

  return workout;
};

/**
 * Signal that timer has completed
 *
 * @param {Workout} workout
 * @param {Object} params
 * @param {string} params.id Timer id
 *
 * @returns {Workout}
 */
export const signalTimerCompleted = (workout, { id }) => {
  const { plan, cursor } = workout;

  // Are there no timers?
  if (plan.length === 0) {
    return workout;
  }

  // Is the current timer not the completed timer?
  if (plan[cursor].id !== id) {
    return workout;
  }

  // Was it the last timer? Are we not already completed?
  if (cursor === plan.length - 1 && !workout.completed) {
    return { ...workout, completed: true, completedAt: Date.now() };
  }

  return nextTimer(workout);
};

/**
 * Advance to the next timer
 *
 * @param {Workout} workout
 *
 * @returns {Workout}
 */
export const nextTimer = (workout) => ({
  ...workout,
  cursor: Math.min(workout.cursor + 1, workout.plan.length - 1),
});

/**
 * Get elapsed time in the workout
 *
 * @param {Workout} workout
 * @param {Object} params
 * @param {import("./clock").Clock} params.clock
 *
 * @returns {number}
 */
export const getWorkoutElapsed = (workout, { clock }) => {
  const { plan, cursor } = workout;

  return (
    sum(plan.slice(0, cursor).map((options) => getTotalDuration(options))) +
    getElapsed(clock)
  );
};

/**
 * Get current timer
 *
 * @returns {import("./timer").TimerOptions}
 */
export const getCurrentTimer = ({ plan, cursor }) => {
  return plan[cursor];
};
