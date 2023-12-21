// react-router-dom
import { useNavigate } from "react-router-dom";

// Ours - Types
import { hasTimerFeature } from "@/types/timer";

// Ours - Components
import TimeDisplay from "@/components/ui/TimeDisplay";
import Button from "@/components/form/Button";
import DeleteTimerButton from "@/components/workout/DeleteTimerButton";

// Ours - Styles
import styles from "./WorkoutPlan.module.css";

/**
 * @param {Object} props
 * @param {Array.<import('@/types/timer').TimerOptions>} props.plan
 * @param {string} [props.selectedTimerId]
 * @param {boolean} [props.readonly]
 * @param {function(string): void} [props.onRemove]
 * @returns {JSX.Element}
 */
const WorkoutPlan = ({ plan, selectedTimerId, readonly = false }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["workout-plan"]}>
      <div className={styles["table"]}>
        <div className={styles["thead"]}>
          <div>Type</div>
          <div>Work</div>
          <div>Rest</div>
          <div>Rounds</div>
        </div>
        <div className={styles["tbody"]}>
          {plan.length === 0 && (
            <div className={styles["no-timers"]}>No timers added yet</div>
          )}
          {plan.map((options) => (
            <div
              className={styles["row"]}
              key={options.id}
              data-active={options.id === selectedTimerId}
            >
              <div className={styles["timer-fields"]}>
                <div>{options.type}</div>
                <div>
                  <TimeDisplay timeMs={options.workDuration} />
                </div>
                <div>
                  {options.restDuration > 0 && (
                    <TimeDisplay timeMs={options.restDuration} />
                  )}
                </div>
                <div>
                  {hasTimerFeature(options.type, "rounds") && options.rounds}
                </div>
              </div>
              {options.description && (
                <div className={styles["description"]}>
                  {options.description}
                </div>
              )}
              {!readonly && (
                <div className={styles.actions}>
                  <DeleteTimerButton id={options.id} />
                  <Button onClick={() => navigate("/edit/" + options.id)}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutPlan;
