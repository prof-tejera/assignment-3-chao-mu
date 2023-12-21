// Ours - Styles
import { getGlobalWorkoutHistory } from "@/utils/workoutHistory";
import styles from "./History.module.css";

const History = () => {
  // Get workout history across all sessions
  const workoutHistory = getGlobalWorkoutHistory();

  return (
    <section className={styles["history"]}>
      <h1>History</h1>
      {workoutHistory.map((workout) => (
        <section key={workout.id} className={styles["workout"]}>
          <h2>Completed {new Date(workout.completedAt).toLocaleString()}</h2>
          <p>{JSON.stringify(workout)}</p>
        </section>
      ))}
    </section>
  );
};

export default History;
