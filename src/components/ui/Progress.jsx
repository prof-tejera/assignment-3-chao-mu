// Ours - Styles
import styles from "./Progress.module.css";

const ProgressBar = ({ max, value }) => {
  return <progress className={styles.progress} max={max} value={value} />;
};

export default ProgressBar;
