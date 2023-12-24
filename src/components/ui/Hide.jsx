import styles from "./Hide.module.css";

const Hide = ({ visible = false, children }) => (
  <span className={visible ? "" : styles.hide}>{children}</span>
);

export default Hide;
