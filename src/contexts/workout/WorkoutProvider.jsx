import useWorkout from "@/hooks/useWorkout";

import WorkoutContext from "./WorkoutContext";

const WorkoutProvider = ({ children }) => {
  const workout = useWorkout();

  return (
    <WorkoutContext.Provider value={workout}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
