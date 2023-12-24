// React
import {} from "react";

// Ours - Components
import WorkoutSummary from "./WorkoutSummary";

// Ours - Contexts
import { useWorkoutContext } from "@/contexts/WorkoutContext";
import { useClockContext } from "@/contexts/ClockContext";

const WorkoutSummaryContainer = () => {
  const workout = useWorkoutContext();
  const clock = useClockContext();

  return <WorkoutSummary workout={workout} clock={clock} />;
};

export default WorkoutSummaryContainer;
