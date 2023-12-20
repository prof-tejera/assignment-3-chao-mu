import PropTypes from "prop-types";

import { padTime, splitTimeMs } from "@/utils/time.js";

const TimeDisplay = ({ timeMs, showMs }) => {
  const { hours, minutes, seconds, ms } = splitTimeMs(timeMs);

  let components = [];
  if (hours > 0) {
    components.push(hours);
  }

  components = [...components, minutes, seconds];

  let prettyTime = components.map((t) => padTime(t)).join(":");
  if (showMs) {
    prettyTime += `.${padTime(ms, 3)}`;
  }

  return <time>{prettyTime}</time>;
};

TimeDisplay.propTypes = {
  timeMs: PropTypes.number.isRequired,
  showMs: PropTypes.bool,
};

export default TimeDisplay;
