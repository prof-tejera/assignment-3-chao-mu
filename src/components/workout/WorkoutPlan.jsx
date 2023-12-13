// Ours - Types
import { hasTimerFeature } from "@/types/timer";

// Ours - Components
import TimeDisplay from "@/components/ui/TimeDisplay";
import Button from "@/components/form/Button";
import Hide from "@/components/ui/Hide";

// Ours - Styles
import styles from "./WorkoutPlan.module.css";

/**
 * @param {Object} props
 * @param {Array.<import('@/types/timer').TimerOptions>} props.plan
 * @param {string} [props.selectedTimerId]
 * @param {boolean} [props.isWorkoutActive]
 * @param {function(string): void} props.onRemove
 * @returns {JSX.Element}
 */
const WorkoutPlan = ({
  plan,
  isWorkoutActive = false,
  selectedTimerId,
  onRemove,
}) => {
  return (
    <section className={styles["workout-plan"]}>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Work</th>
            <th>Rest</th>
            <th>Rounds</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {plan.length === 0 && (
            <tr>
              <td className={styles["no-timers"]} colSpan={5}>
                No timers added yet
              </td>
            </tr>
          )}
          {plan.map((options) => (
            <tr key={options.id} data-active={options.id === selectedTimerId}>
              <td>{options.type}</td>
              <td>
                <TimeDisplay timeMs={options.workDuration} />
              </td>
              <td>
                {options.restDuration > 0 && (
                  <TimeDisplay timeMs={options.restDuration} />
                )}
              </td>
              <td>
                {hasTimerFeature(options.type, "rounds") && options.rounds}
              </td>
              <td className={styles.actions}>
                <Hide
                  visible={options.id !== selectedTimerId || !isWorkoutActive}
                >
                  <Button onClick={() => onRemove(options.id)}>Delete</Button>
                </Hide>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default WorkoutPlan;
