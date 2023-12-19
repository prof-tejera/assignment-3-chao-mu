/**
 * @typedef {Object} Workout
 * @property {import("@/types/timer").TimerOptions[]} plan
 * @property {import("@/types/timer").TimerOptions | null} currentTimerOptions
 * @property {boolean} completed
 * @property {boolean} isLastTimer
 * @property {boolean} isFirstTimer
 */

/**
 * @typedef {Object} WorkoutState
 * @property {Array<import("./timer").TimerOptions>} plan
 * @property {number} cursor
 * @property {boolean} completed
 */

export const createWorkout = (state) => {
  const { plan, cursor } = state;
  const isLastTimer = cursor >= plan.length - 1;
  const isFirstTimer = cursor <= 0;

  const currentTimerOptions = plan[cursor] || null;

  return {
    ...state,
    currentTimerOptions,
    isLastTimer,
    isFirstTimer,
  };
};

export const removeTimer = ({ state, id }) => {
  const { plan, cursor } = state;
  const index = plan.findIndex((timer) => timer.id === id);

  if (index === -1) {
    throw new Error(`Timer with id ${id} not found in plan`);
  }

  // Did we remove the last cursor?
  if (plan.length === 1) {
    return {
      ...state,
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

  return { ...state, plan: updatedPlan, cursor: updatedCursor };
};

export const nextTimer = (state) => ({
  ...state,
  cursor: Math.min(state.cursor + 1, state.plan.length - 1),
});
