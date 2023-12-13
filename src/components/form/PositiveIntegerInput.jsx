import PropTypes from "prop-types";

import { useFormContext } from "react-hook-form";

import FieldWrapper from "@/components/form/FieldWrapper";

const PositiveIntegerInput = ({ label, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper label={label} name={name} error={errors[name]}>
      <input
        type="number"
        name={name}
        id={name}
        {...register(name, {
          valueAsNumber: true,
          validate: (value) => {
            if (!value || value < 1) {
              return "Must provide a whole number greater than 0";
            }
          },
        })}
      />
    </FieldWrapper>
  );
};

PositiveIntegerInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default PositiveIntegerInput;
