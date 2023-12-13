// Ours - Styles
import styles from "./Debug.module.css";

const Debug = ({ data }) => (
  <div className={styles.debug}>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default Debug;
