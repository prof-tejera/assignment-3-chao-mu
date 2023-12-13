import styles from "./FieldWrapper.module.css";

const FieldWrapper = ({ name, label, children, error }) => (
  <div className={styles["field-wrapper"]} data-has-error={!!error}>
    <label htmlFor={name}>{label}</label>
    {children}
    <label role="alert" htmlFor={name}>
      {error && error.message}
    </label>
  </div>
);

export default FieldWrapper;
