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

  const dispatchNextTimer = () => {
    workoutPlanDispatch(nextTimer());
  };

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
      dispatchNextTimer();
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
    signalCompleted: () => {
      dispatchNextTimer();
    },
  };

  return (
    <PlanContext.Provider value={provided}>{children}</PlanContext.Provider>
  );
};

export default PlanProvider;
