// react-router-dom
import { useNavigate } from "react-router-dom";

// Ours - Components
import TimerForm from "@/components/timer/TimerForm";

// Ours - Contexts
import {
  useWorkoutDispatchContext,
  useWorkoutContext,
} from "@/contexts/WorkoutContext";

import { useClockDispatchContext } from "@/contexts/ClockContext";

// Ours - Reducers
import { WorkoutActionType } from "@/reducers/workoutReducer";
import { ClockActionType } from "@/reducers/clockReducer";

const AddTimerForm = () => {
  const navigate = useNavigate();

  const workoutDispatch = useWorkoutDispatchContext();
  const { completed } = useWorkoutContext();

  const clockDispatch = useClockDispatchContext();

  // Add the timer and redirect to home
  const handleSubmit = (options) => {
    workoutDispatch({
      type: WorkoutActionType.ADD_TIMER,
      payload: { options },
    });

    if (completed) {
      clockDispatch({
        type: ClockActionType.SET_ELAPSED,
        payload: { elapsed: 0 },
      });

      workoutDispatch({
        type: WorkoutActionType.NEXT_TIMER,
      });
    }

    navigate("/");
  };

  return <TimerForm onSubmit={handleSubmit} />;
};

export default AddTimerForm;
