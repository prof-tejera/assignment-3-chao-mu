// React
import { createContext, useContext } from "react";

// Ours - Reducer
import { useWorkoutReducer } from "@/reducers/workoutReducer";

const WorkoutContext = createContext(null);
const WorkoutDispatchContext = createContext(null);

/**
 * @returns {import('@/types/workout').Workout}
 */
export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }

  return context;
};

export const useWorkoutDispatchContext = () => {
  const context = useContext(WorkoutDispatchContext);
  if (!context) {
    throw new Error(
      "useWorkoutDispatchContext must be used within a WorkoutProvider",
    );
  }

  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [workout, dispatch] = useWorkoutReducer();

  return (
    <WorkoutContext.Provider value={workout}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorkoutContext.Provider>
  );
};
