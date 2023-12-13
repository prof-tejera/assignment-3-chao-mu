// React
import { useRef, useEffect } from "react";

// Ours - Reducers
import { tickClock } from "@/reducers/clockReducer";

// Ours - Hooks
import useInterval from "@/hooks/useInterval";

/**
 * Ensure the clockReducer remains up to date and call the callback every tick, paused or not
 *
 * @returns {void}
 */
export default (callback, state, dispatch) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const { ticks } = state;

  // Runs at least every tick.
  useEffect(() => {
    if (savedCallback.current) {
      savedCallback.current(state);
    }
  }, [state, ticks, savedCallback]);

  // Runs every 20ms
  useInterval(() => {
    dispatch(tickClock());
  }, 20);
};
