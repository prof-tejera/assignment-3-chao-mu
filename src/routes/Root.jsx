// Ours - Routes - Layouts
import SiteLayout from "./layouts/SiteLayout";

// Ours - Contexts
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import { ClockProvider } from "@/contexts/ClockContext";
import { WorkoutManagementProvider } from "@/contexts/WorkoutManagementContext";

const Root = () => (
  <WorkoutProvider>
    <ClockProvider>
      <WorkoutManagementProvider>
        <SiteLayout />
      </WorkoutManagementProvider>
    </ClockProvider>
  </WorkoutProvider>
);

export default Root;
