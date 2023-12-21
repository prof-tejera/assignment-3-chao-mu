// react-router-dom
import { useNavigate } from "react-router-dom";

// Ours - Utils
import throwNotFound from "@/utils/throwNotFound";

// Ours - Contexts
import { useWorkoutManagementContext } from "@/contexts/WorkoutManagementContext";
import { useWorkoutContext } from "@/contexts/WorkoutContext";

// Ours - Components
import TimerForm from "@/components/timer/TimerForm";

const EditPage = ({ timerId }) => {
  const navigate = useNavigate();

  const { updateTimer } = useWorkoutManagementContext();
  const { plan } = useWorkoutContext();

  const timerOptions = plan.find((timer) => timer.id === timerId);
  if (timerOptions === undefined) {
    throwNotFound(`Timer with id ${timerId} not found`);
  }

  const handleSubmit = (options) => {
    updateTimer(options);
    navigate("/workout");
  };

  return <TimerForm values={timerOptions} onSubmit={handleSubmit} />;
};

export default EditPage;
