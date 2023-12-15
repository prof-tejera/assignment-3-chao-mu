import { useRef } from "react";

import PropTypes from "prop-types";

import FieldWrapper from "./FieldWrapper";

import styles from "./TimeInput.module.css";

import { useController } from "react-hook-form";

import { joinTimeMs, splitTimeMs } from "@/utils/time";

const minutesPresets = [0, 1, 2, 3, 5, 10, 15, 20, 25, 30, 45, 50, 60];

const secondsPresets = [0, 5, 15, 30, 45];

const findNearest = (value, presets) =>
  presets.reduce((prev, curr) => {
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  }, presets[0]);

const TimeInput = ({ label, name, defaultValue = 0 }) => {
  const {
    field: { onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    defaultValue,
    rules: {
      validate: (value) => {
        if (value < 1) {
          return "Time has to be greater than 0 seconds";
        }
      },
    },
  });

  const defaultTime = splitTimeMs(defaultValue);
  const defaultMinutes = findNearest(
    defaultTime.minutes + defaultTime.hours * 60,
    minutesPresets,
  );
  const defaultSeconds = findNearest(defaultTime.seconds, secondsPresets);

  const minutesRef = useRef();
  const secondsRef = useRef();

  const handleChange = () => {
    const minutes = minutesRef.current.value;
    const seconds = secondsRef.current.value;
    const totalMs = joinTimeMs({ minutes, seconds });

    onChange(totalMs);
  };

  return (
    <FieldWrapper label={label} name={name} error={errors[name]}>
      <div id={name} className={styles["time-input"]}>
        <select onChange={handleChange} onBlur={onBlur} ref={minutesRef}>
          {minutesPresets.map((num) => (
            <option key={num} value={num}>
              {num.toString().padStart(2, "0")} minutes
            </option>
          ))}
        </select>
        <select onChange={handleChange} onBlur={onBlur} ref={secondsRef}>
          {secondsPresets.map((num) => (
            <option key={num} value={num}>
              {num} seconds
            </option>
          ))}
        </select>
      </div>
    </FieldWrapper>
  );
};

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TimeInput;
