// React
import { createContext, useContext, useEffect } from "react";

// Ours - Reducer
import { workoutReducer } from "@/reducers/workoutReducer";

// Ours - Hooks
import useSessionReducer from "@/hooks/useSessionReducer";
import useWorkoutHistory from "@/hooks/useWorkoutHistory";

// Ours - Types
import { createWorkout } from "@/types/workout";

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
  const [workout, dispatch] = useSessionReducer({
    subkey: "workout",
    reducer: workoutReducer,
    initialState: createWorkout(),
  });

  const updateHistory = useWorkoutHistory();

  useEffect(() => {
    updateHistory(workout);
  }, [workout, updateHistory]);

  return (
    <WorkoutContext.Provider value={workout}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorkoutContext.Provider>
  );
};
