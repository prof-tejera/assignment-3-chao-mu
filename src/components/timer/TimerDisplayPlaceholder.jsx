// react-router-dom
import { Link } from "react-router-dom";

// Ours - Style
import styles from "./TimerDisplayPlaceholder.module.css";

// Ours - Components
import TimerDisplayPanel from "./TimerDisplayPanel";

const TimerDisplayPlaceholder = () => (
  <TimerDisplayPanel placeholder>
    <div className={styles["instructions"]}>
      <Link to="/add">Add</Link> a timer to get started
    </div>
  </TimerDisplayPanel>
);

export default TimerDisplayPlaceholder;
