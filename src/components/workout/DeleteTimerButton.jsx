// Ours - Components
import Button from "@/components/form/Button";

// Ours - Contexts
import { useWorkoutDispatchContext } from "@/contexts/WorkoutContext";
import { useClockDispatchContext } from "@/contexts/ClockContext";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";
import { ClockActionType } from "@/reducers/clockReducer";

const DeleteTimerButton = ({ id }) => {
  const workoutDispatch = useWorkoutDispatchContext();
  const clockDispatch = useClockDispatchContext();

  const deleteTimer = () => {
    workoutDispatch({
      type: WorkoutActionType.REMOVE_TIMER,
      payload: { id },
    });

    clockDispatch({
      type: ClockActionType.SET_ELAPSED,
      payload: { elapsed: 0 },
    });
  };

  return <Button onClick={deleteTimer}>Delete</Button>;
};

export default DeleteTimerButton;
