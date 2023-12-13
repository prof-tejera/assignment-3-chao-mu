import { useReducer, useEffect } from "react";

/**
 * @typedef {Object} ClockState
 * @property {number} transpired
 * @property {boolean} paused
 * @property {number | null} startedAt
 * @property {number} transpiredAtPause
 * @property {number} ticks
 */

/**
 * Possible action types for clockReducer
 *
 * @enum {string}
 * @readonly
 */
export const ClockActionType = {
  RESUME: "RESUME",
  PAUSE: "PAUSE",
  RESET: "RESET",
  RESTART: "RESTART",
  TICK: "TICK",
  SET_TRANSPIRED: "SET_TRANSPIRED",
};

/**
 * Default state for clockReducer
 *
 * @type {ClockState}
 */
const initialState = {
  startedAt: null,
  transpired: 0,
  paused: true,
  transpiredAtPause: 0,
  ticks: 0,
};

/**
 * Creates an action that resumes the clock if paused, otherwise does nothing
 *
 * @returns {{type: ClockActionType}}
 */
export const resumeClock = () => ({ type: ClockActionType.RESUME });

/**
 * Creates an action that pauses the clock if running, otherwise does nothing
 *
 * @returns {{type: ClockActionType}}
 */
export const pauseClock = () => ({ type: ClockActionType.PAUSE });

/**
 * Creates an action that resets the clock to its initial state, and keeps it paused
 *
 * @returns {{type: ClockActionType}}
 */
export const resetClock = () => ({ type: ClockActionType.RESET });

/**
 * Creates an action that resets the clock to its initial state, but unpauses it
 *
 * @returns {{type: ClockActionType}}
 */
export const restartClock = () => ({ type: ClockActionType.RESTART });

/**
 * Creates an action that causes the internal state of the clock to update
 *
 * @returns {{type: ClockActionType}}
 */
export const tickClock = () => ({ type: ClockActionType.TICK });

/**
 * Creates an action that sets the transpired time to a fix amount, optionally pausing it
 *
 * @param {Object} payload
 * @param {number} payload.transpired
 *
 * @returns {{type: ClockActionType, payload: {transpired: number}}}
 */
export const setTranspired = ({ transpired }) => ({
  type: ClockActionType.SET_TRANSPIRED,
  payload: { transpired },
});

/**
 * @param {ClockState} state
 * @param {Object} action
 * @param {ClockActionType} action.type
 * @param {any} [action.payload]
 */
const clockReducer = (state, { type, payload }) => {
  switch (type) {
    case ClockActionType.RESUME: {
      return {
        ...state,
        startedAt: Date.now(),
        paused: false,
      };
    }
    case ClockActionType.PAUSE: {
      return {
        ...state,
        transpiredAtPause: state.transpired,
        paused: true,
      };
    }
    case ClockActionType.RESET: {
      return { ...initialState };
    }
    case ClockActionType.RESTART: {
      return {
        ...initialState,
        startedAt: Date.now(),
        paused: false,
      };
    }
    case ClockActionType.TICK: {
      const newTicks = state.ticks + 1;
      const newTranspired = state.paused
        ? state.transpired
        : state.transpiredAtPause + Date.now() - state.startedAt;

      return {
        ...state,
        ticks: newTicks,
        transpired: newTranspired,
      };
    }
    case ClockActionType.SET_TRANSPIRED: {
      const { transpired } = payload;

      return {
        ...state,
        transpired,
        transpiredAtPause: transpired,
        paused: true,
      };
    }
    default: {
      throw Error("Unknown action received by clockReducer: " + type);
    }
  }
};

/**
 * Use the clock reducer, which manages internal time. Must be dispatched ticks.
 *
 * @returns {[ClockState, function({type: ClockActionType, [payload: any]})]}
 */
export const useClockReducer = () => {
  const [state, dispatch] = useReducer(clockReducer, initialState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: ClockActionType.TICK });
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return [state, dispatch];
};
