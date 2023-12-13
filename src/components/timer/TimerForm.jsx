//
import { useForm, FormProvider } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// Ours - Types
import { TimerOptionsPresets as presets } from "@/types/timer";

// Ours - Components
import TimeInput from "@/components/form/TimeInput";
import PositiveIntegerInput from "@/components/form/PositiveIntegerInput";
import Select from "@/components/form/Select";
import Button from "@/components/form/Button";

import styles from "./TimerForm.module.css";

/**
 * @param {Object} props
 * @param {function(import('@/types/timer').TimerOptions): void} props.onSubmit
 */
const TimerForm = ({ onSubmit }) => {
  const formMethods = useForm({
    defaultValues: {
      type: "Stopwatch",
    },
  });

  const { handleSubmit, watch } = formMethods;

  const type = watch("type");
  const enabledFields = type ? presets[type].features : [];

  const onSubmitWrapper = (data) => {
    const { features: userProvided, constants } = presets[type];

    const userProvidedData = Object.fromEntries(
      userProvided.map((key) => [key, data[key]]),
    );

    /** @type {import('@/types/timer').TimerOptions} **/
    const timerOptions = {
      ...userProvidedData,
      ...constants,
      type: data.type,
      id: uuidv4(),
    };

    onSubmit(timerOptions);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitWrapper)} className={styles.form}>
        <Select label="Timer Type" name="type" options={Object.keys(presets)} />

        {enabledFields.includes("workDuration") && (
          <TimeInput label="Work Duration" name="workDuration" />
        )}
        {enabledFields.includes("restDuration") && (
          <TimeInput label="Rest Duration" name="restDuration" />
        )}
        {enabledFields.includes("rounds") && (
          <PositiveIntegerInput required={true} label="Rounds" name="rounds" />
        )}
        <Button submit>Save</Button>
      </form>
    </FormProvider>
  );
};

export default TimerForm;
