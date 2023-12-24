import PropTypes from "prop-types";

import { useFormContext } from "react-hook-form";

import FieldWrapper from "@/components/form/FieldWrapper";

const PositiveIntegerInput = ({ label, name, options = [] }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper label={label} name={name} error={errors[name]}>
      <select name={name} id={name} {...register(name)}>
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

PositiveIntegerInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
};

export default PositiveIntegerInput;
