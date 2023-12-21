// Ours - Hooks
import useStorage from "@/hooks/useStorage";

// Ours - Utils
import { getOrCreateSessionId } from "@/utils/storage";
import {
  workoutHistorySubkey,
  updateWorkoutHistory,
  createWorkoutHistory,
} from "@/utils/workoutHistory";

const useWorkoutHistory = () => {
  const [history, setHistory] = useStorage(
    {
      sessionId: getOrCreateSessionId(),
      subkey: workoutHistorySubkey,
    },
    createWorkoutHistory(),
  );

  return (workout) => setHistory(updateWorkoutHistory(history, workout));
};

export default useWorkoutHistory;
