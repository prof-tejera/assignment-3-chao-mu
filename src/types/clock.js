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
  if (paused) {
    return elapsedAtPause;
  }

  return Date.now() - startedAt + elapsedAtPause;
};
