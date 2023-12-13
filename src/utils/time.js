const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;

export const correctFloatingPointError = (timeComps) => {
  const { hours, minutes, seconds, ms } = timeComps;

  if (seconds === 60) {
    return { hours, minutes: minutes + 1, seconds: 0, ms };
  } else if (minutes === 60) {
    return { hours: hours + 1, minutes: 0, seconds, ms };
  } else if (Math.round(ms) === 1000) {
    return { hours, minutes, seconds: seconds + 1, ms: 0 };
  }

  return timeComps;
};

export const padTime = (t, digits = 2) => t.toString().padStart(digits, "0");

export const splitTimeMs = (timeMs) => {
  // Convert to hours, truncate the remainder.
  const hoursExact = timeMs / msPerHour;
  const hours = Math.floor(hoursExact);

  // Take the remainder from before and convert to minutes
  const minutesExact = (hoursExact - hours) * 60;
  const minutes = Math.floor(minutesExact);

  // Take the remainder from before and convert to seconds
  const secondsExact = (minutesExact - minutes) * 60;
  const seconds = Math.floor(secondsExact);

  const ms = Math.round((secondsExact - seconds) * 1000);

  return correctFloatingPointError({ hours, minutes, seconds, ms });
};

export const timeInWords = (timeMs) => {
  const timeComps = splitTimeMs(timeMs);

  // Skip milliseconds
  delete timeComps.ms;

  return (
    Object.entries(timeComps)
      .filter((kv) => kv[1] > 0)
      .map(([key, value]) => `${value} ${key}`)
      .join(", ") || "0 seconds"
  );
};

export const joinTimeMs = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  return hours * msPerHour + minutes * msPerMinute + seconds * msPerSecond;
};
