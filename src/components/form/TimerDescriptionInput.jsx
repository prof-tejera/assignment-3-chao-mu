import { useState } from "react";

import { useFormContext } from "react-hook-form";

import FieldWrapper from "@/components/form/FieldWrapper";

// Ours - Styles
import styles from "./TimerDescriptionInput.module.css";

const TimerDescriptionInput = ({ name }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const maxLength = 280;
  const value = watch(name);
  const remaining = maxLength - value.length;

  return (
    <FieldWrapper label="Description" name={name} error={errors[name]}>
      <div className={styles["help-input"]}>
        <p className={styles["help"]}>
          Describe your timer in {maxLength} characters or less.
          {remaining < 0 ? (
            <span className={styles["error"]}>
              {" "}
              Use {Math.abs(remaining)} less characters!
            </span>
          ) : (
            <span className={styles["accedptable"]}>
              {" "}
              {remaining} remaining
            </span>
          )}
        </p>
        <textarea
          name={name}
          id={name}
          rows={5}
          className={styles["textarea"]}
          {...register(name, {
            maxLength: {
              value: maxLength,
              message: `Description must be less than ${maxLength} characters.`,
            },
          })}
        />
      </div>
    </FieldWrapper>
  );
};

export default TimerDescriptionInput;
