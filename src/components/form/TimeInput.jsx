import { useRef } from "react";

import PropTypes from "prop-types";

import FieldWrapper from "./FieldWrapper";

import styles from "./TimeInput.module.css";

import { useController } from "react-hook-form";

import { joinTimeMs } from "@/utils/time";

const TimeInput = ({ label, name }) => {
  const {
    field: { onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    defaultValue: 0,
    rules: {
      validate: (value) => {
        if (value < 1) {
          return "Time has to be greater than 0 seconds";
        }
      },
    },
  });

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
          {[
            "00",
            "01",
            "02",
            "03",
            "05",
            "10",
            "15",
            "20",
            "25",
            "30",
            "45",
            "50",
            "60",
          ].map((num) => (
            <option key={num} value={num}>
              {num} minutes
            </option>
          ))}
        </select>
        <select onChange={handleChange} onBlur={onBlur} ref={secondsRef}>
          {["00", "05", "15", "30", "45"].map((num) => (
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
