import { useEffect, useRef } from "react";

/**
 * Invoke callback every `delay` milliseconds.
 * @param {function} callback
 * @param {number} delay
 */
export default (callback, delay) => {
  // Keep track of the latest callback using a reference
  // so we don't have to juggle any dependencies in `useEffect`
  // that may change outside this function.
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const intervalId = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(intervalId);
  }, [delay]);
};
