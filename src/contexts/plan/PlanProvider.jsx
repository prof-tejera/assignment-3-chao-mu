// Ours - Context
import PlanContext from "./PlanContext";

// Ours - Reducers
import {
  useWorkoutPlanReducer,
  nextTimer,
  prevTimer,
  addTimer,
  removeTimer,
  gotoFirstTimer,
  updateTimer,
} from "@/reducers/planReducer";

const PlanProvider = ({ children }) => {
  const [{ currentTimerOptions, isLastTimer, plan }, workoutPlanDispatch] =
    useWorkoutPlanReducer();

  const provided = {
    plan,
    isLastTimer,
    currentTimerOptions,
    updateTimer: (options) => {
      workoutPlanDispatch(updateTimer({ options }));
    },
    prevTimer: () => {
      workoutPlanDispatch(prevTimer());
    },
    nextTimer: () => {
      workoutPlanDispatch(nextTimer());
    },
    resetWorkout: () => {
      workoutPlanDispatch(gotoFirstTimer());
    },
    removeTimer: (id) => {
      workoutPlanDispatch(removeTimer({ id }));
    },
    addTimer: (options) => {
      workoutPlanDispatch(addTimer({ options }));
    },
  };

  return (
    <PlanContext.Provider value={provided}>{children}</PlanContext.Provider>
  );
};

export default PlanProvider;
