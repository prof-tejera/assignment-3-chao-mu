/**
 * @typedef {Object} Clock
 * @property {boolean} paused
 * @property {number | null} startedAt
 * @property {number} elapsedAtPause
 */

/** @returns {Clock} */
export const createClock = () => ({
  startedAt: null,
  paused: true,
  elapsedAtPause: 0,
});

/**
 * @param {Clock} clock
 * @returns number
 */
export const getElapsed = ({ paused, elapsedAtPause, startedAt }) => {
  if (paused || startedAt === null) {
    return elapsedAtPause;
  }

  return Date.now() - startedAt + elapsedAtPause;
};

/**
 * @param {Clock} clock
 * @param {Object} params
 * @param {number} params.elapsed
 * @returns Clock
 */
export const setElapsed = (clock, { elapsed }) =>
  clock.paused
    ? {
        ...clock,
        startedAt: null,
        elapsedAtPause: elapsed,
      }
    : {
        ...clock,
        startedAt: Date.now(),
        elapsedAtPause: elapsed,
      };

/**
 * @param {Clock} clock
 * @returns Clock
 */
export const pauseClock = (clock) => ({
  ...clock,
  elapsedAtPause: getElapsed(clock),
  paused: true,
});

/**
 * @param {Clock} clock
 * @returns Clock
 */
export const resumeClock = (clock) => ({
  ...clock,
  startedAt: Date.now(),
  paused: false,
});
