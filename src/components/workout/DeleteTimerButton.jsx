// Ours - Components
import Button from "@/components/form/Button";

// Ours - Contexts
import { useWorkoutManagementContext } from "@/contexts/WorkoutManagementContext";

const DeleteTimerButton = ({ id }) => {
  const { removeTimer } = useWorkoutManagementContext();

  return <Button onClick={() => removeTimer({ id })}>Delete</Button>;
};

export default DeleteTimerButton;
