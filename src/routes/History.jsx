// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";

import {
  getGlobalWorkoutHistory,
  sortedWorkoutHistory,
} from "@/utils/workoutHistory";
// Ours - Styles
import styles from "./History.module.css";

const History = () => {
  // Get workout history across all sessions
  const workoutHistory = sortedWorkoutHistory(getGlobalWorkoutHistory());

  return (
    <section className={styles["history"]}>
      <h1>History</h1>
      <p>
        Completed workouts accross all sessions. One session per tab or window.
        Each session has its own workout plan.
      </p>
      <div className={styles["spacer"]} />
      <div className={styles["history-list"]}>
        {workoutHistory.map((workout) => (
          <section key={workout.id} className={styles["workout"]}>
            <h2>Completed {new Date(workout.completedAt).toLocaleString()}</h2>
            <WorkoutPlan plan={workout.plan} readonly />
          </section>
        ))}
      </div>
    </section>
  );
};

export default History;
