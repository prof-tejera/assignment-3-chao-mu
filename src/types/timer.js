import { getElapsed } from "@/types/clock";

/**
 * @typedef {Object} TimerOptions
 * @property {string} id - Unique identifier of the timer.
 * @property {string} type - Type of timer (e.g. Stopwatch, Countdown, XY, TABATA).
 * @property {number} workDuration - Duration of work period in miliseconds.
 * @property {number} restDuration - Duration of rest period in miliseconds.
 * @property {number} rounds - Number of rounds.
 * @property {boolean} countUp - Indicates if the timer counts up
 */

/**
 * @typedef {Object} TimerProgress
 * @property {string} id - Unique identifier of the timer.
 * @property {number} completedRounds - Number of completed rounds.
 * @property {number} round - Current round
 * @property {number} roundDuration - Current round's duration
 * @property {number} roundProgress - Progress of current round.
 * @property {number} totalProgress - Progress of all rounds.
 * @property {boolean} isWorking - Indicates if the timer is in work period.
 * @property {number} roundElapsed - Time remaining in current round.
 * @property {TimerStatus} status - Status of the timer.
 */

/**
 * @typedef {Object} TimerOptionsPreset
 * @property {string[]} features - Options that the user must provide.
 * @property {Object} constants - Options that are constant for the preset.
 */

/**
 * @typedef {Object} TimerSnapshot
 * @property {TimerOptions} options - Options of the timer.
 * @property {TimerProgress} progress - Progress of the timer.
 */

/**
 * The running status of a timer.
 * @enum {string}
 */
export const TimerStatus = {
  /** Timer is paused. */
  STOPPED: "stopped",
  /** Timer is running. */
  RUNNING: "running",
  /** Timer is completed. */
  COMPLETED: "completed",
};

/**
 * Logically, all timers are different configurations of a TABATA
 *
 * timer, but users may see it differently.
 * @type {Object.<string, TimerOptionsPreset>}
 */
export const TimerOptionsPresets = {
  Stopwatch: {
    features: ["workDuration"],
    constants: {
      restDuration: 0,
      rounds: 1,
      countUp: true,
    },
  },
  Countdown: {
    features: ["workDuration"],
    constants: {
      restDuration: 0,
      rounds: 1,
      countUp: false,
    },
  },
  XY: {
    features: ["workDuration", "rounds"],
    constants: {
      restDuration: 0,
      countUp: false,
    },
  },
  TABATA: {
    features: ["workDuration", "restDuration", "rounds"],
    constants: {
      countUp: false,
    },
  },
};

export const createTimerSnapshot = ({ options, clock }) => ({
  options,
  progress: getTimerProgress({ options, clock }),
});

export const hasTimerFeature = (type, feature) => {
  const preset = TimerOptionsPresets[type];

  // Enable all features by default, as they logically make sense for all timers
  // and this is just guarding against criticism
  return !preset || preset.features.includes(feature);
};

/**
 * Returns the progress of the timer given a clock
 *
 * @param {Object} params
 * @param {TimerOptions} params.options - Options of the timer.
 * @param {import("@/types/clock").Clock} params.clock - Clock keeping timer's time
 *
 * @returns {TimerProgress} Progress of the timer.
 */
export const getTimerProgress = ({ options, clock }) => {
  const { paused } = clock;
  const elapsed = getElapsed(clock);

  const { workDuration, restDuration, rounds, id } = options;
  const msPerRound = workDuration + restDuration;

  const completedRoundsExact = elapsed / msPerRound;
  const completedRounds = Math.floor(completedRoundsExact);

  const isCompleted = completedRounds >= rounds;

  if (isCompleted) {
    const roundDuration = restDuration !== 0 ? restDuration : workDuration;

    return {
      id,
      completedRounds,
      roundDuration,
      roundProgress: 1,
      totalProgress: 1,
      isWorking: false,
      roundElapsed: roundDuration,
      status: TimerStatus.COMPLETED,
      round: rounds,
    };
  }

  const roundRemainder = (completedRoundsExact - completedRounds) * msPerRound;
  const isWorking = roundRemainder < workDuration;

  const roundElapsed = isWorking
    ? Math.min(roundRemainder, workDuration)
    : Math.max(0, roundRemainder - workDuration);

  const roundProgress =
    roundElapsed / (isWorking ? workDuration : restDuration);
  const totalProgress = (completedRounds + roundProgress) / rounds;

  let status = paused ? TimerStatus.RUNNING : TimerStatus.STOPPED;

  return {
    id,
    completedRounds,
    roundProgress,
    totalProgress,
    isWorking,
    roundElapsed,
    status,
    round: Math.min(completedRounds + 1, rounds),
    roundDuration: isWorking ? workDuration : restDuration,
  };
};

/**
 * Returns the total duration of the timer.
 * @param {TimerOptions} options - Options of the timer.
 * @returns {number} Total duration of the timer.
 **/
export const getTotalDuration = (options) => {
  const { workDuration, restDuration, rounds } = options;

  return (workDuration + restDuration) * rounds;
};
