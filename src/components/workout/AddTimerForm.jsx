// react-router-dom
import { useNavigate } from "react-router-dom";

// Ours - Components
import TimerForm from "@/components/timer/TimerForm";

// Ours - Contexts
import { useWorkoutManagementContext } from "@/contexts/WorkoutManagementContext";

const AddTimerForm = () => {
  const navigate = useNavigate();

  const { addTimer } = useWorkoutManagementContext();

  // Add the timer and redirect to home
  const handleSubmit = (options) => {
    addTimer(options);
    navigate("/");
  };

  return <TimerForm onSubmit={handleSubmit} />;
};

export default AddTimerForm;
