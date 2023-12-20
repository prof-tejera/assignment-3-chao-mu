import { useReducer } from "react";

// Types - Clock
import {
  createClock,
  pauseClock,
  resumeClock,
  setElapsed,
} from "@/types/clock";

const initialState = createClock();

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
  SET_ELAPSED: "SET_ELAPSED",
};

/**
 * @param {import("@/types/clock").Clock} state
 * @param {Object} action
 * @param {ClockActionType} action.type
 * @param {any} [action.payload]
 */
export const clockReducer = (state, { type, payload }) => {
  switch (type) {
    case ClockActionType.RESUME: {
      return resumeClock(state);
    }
    case ClockActionType.PAUSE: {
      return pauseClock(state);
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
    case ClockActionType.SET_ELAPSED: {
      const { elapsed } = payload;

      return setElapsed(state, { elapsed });
    }
    default: {
      throw Error("Unknown action received by clockReducer: " + type);
    }
  }
};
