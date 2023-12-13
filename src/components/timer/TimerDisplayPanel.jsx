// Ours - Styles
import styles from "./TimerDisplayPanel.module.css";

const TimerDisplayPanel = ({ placeholder = false, children }) => (
  <section
    data-placeholder={placeholder}
    className={styles["timer-display-panel"]}
  >
    {children}
  </section>
);

export default TimerDisplayPanel;
