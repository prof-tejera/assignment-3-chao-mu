// react-hook-form
import { useForm, FormProvider } from "react-hook-form";

// uuid
import { v4 as uuidv4 } from "uuid";

// Ours - Types
import { TimerOptionsPresets as presets } from "@/types/timer";

// Ours - Components
import TimeInput from "@/components/form/TimeInput";
import PositiveIntegerInput from "@/components/form/PositiveIntegerInput";
import TimerDescriptionInput from "@/components/form/TimerDescriptionInput";
import Select from "@/components/form/Select";
import Button from "@/components/form/Button";

import styles from "./TimerForm.module.css";

/**
 * @param {Object} props
 * @param {function(import('@/types/timer').TimerOptions): void} props.onSubmit
 * @param {import('@/types/timer').TimerOptions} [props.values]
 */
const TimerForm = ({ values, onSubmit }) => {
  let defaultValues = {
    type: "Stopwatch",
    description: "",
  };

  if (values) {
    defaultValues = { ...defaultValues, ...values };
  }

  const formMethods = useForm({ defaultValues });

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
      id: data.id || uuidv4(),
    };

    onSubmit(timerOptions);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitWrapper)} className={styles.form}>
        <Select label="Timer Type" name="type" options={Object.keys(presets)} />

        {enabledFields.includes("workDuration") && (
          <TimeInput
            label="Work Duration"
            name="workDuration"
            defaultValue={defaultValues["workDuration"]}
          />
        )}
        {enabledFields.includes("restDuration") && (
          <TimeInput
            label="Rest Duration"
            name="restDuration"
            defaultValue={defaultValues["restDuration"]}
          />
        )}
        {enabledFields.includes("rounds") && (
          <PositiveIntegerInput required={true} label="Rounds" name="rounds" />
        )}
        {enabledFields.includes("description") && (
          <TimerDescriptionInput name="description" />
        )}
        <Button submit>Save</Button>
      </form>
    </FormProvider>
  );
};

export default TimerForm;
