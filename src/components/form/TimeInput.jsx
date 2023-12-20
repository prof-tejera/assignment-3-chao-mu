// React
import { useRef } from "react";

// react-hook-form
import { useController } from "react-hook-form";

// Ours - Components
import FieldWrapper from "./FieldWrapper";

// Ours - Utils
import { joinTimeMs, splitTimeMs } from "@/utils/time";
import { findNearestNumber } from "@/utils/math";

// Ours - Styles
import styles from "./TimeInput.module.css";

const minutesPresets = [0, 1, 2, 3, 5, 10, 15, 20, 25, 30, 45, 50, 60];

const secondsPresets = [0, 5, 15, 30, 45];

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
  const defaultMinutes = findNearestNumber(
    defaultTime.minutes + defaultTime.hours * 60,
    minutesPresets,
  );
  const defaultSeconds = findNearestNumber(defaultTime.seconds, secondsPresets);

  const minutesRef = useRef();
  const secondsRef = useRef();

  const handleChange = () => {
    if (!minutesRef.current || !secondsRef.current) {
      return;
    }

    const minutes = minutesRef.current.value;
    const seconds = secondsRef.current.value;
    const totalMs = joinTimeMs({ minutes, seconds });

    onChange(totalMs);
  };

  return (
    <FieldWrapper label={label} name={name} error={errors[name]}>
      <div id={name} className={styles["time-input"]}>
        <select
          onChange={handleChange}
          defaultValue={defaultMinutes}
          onBlur={onBlur}
          ref={minutesRef}
        >
          {minutesPresets.map((num) => (
            <option key={num} value={num}>
              {num.toString().padStart(2, "0")} minutes
            </option>
          ))}
        </select>
        <select
          onChange={handleChange}
          defaultValue={defaultSeconds}
          onBlur={onBlur}
          ref={secondsRef}
        >
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

export default TimeInput;
