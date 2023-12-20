// Ours - Pages
import SiteLayout from "@/views/SiteLayout";
import HomePage from "@/views/HomePage";
import AddPage from "@/views/AddPage";
import EditPage from "@/views/EditPage";
import FormPageLayout from "@/views/FormPageLayout";
import DocumentationPage from "@/views/DocumentationPage";

// Ours - Contexts
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import { ClockProvider } from "@/contexts/ClockContext";
import { WorkoutManagementProvider } from "@/contexts/WorkoutManagementContext";

// Ours - Components
import { FallbackForRouter } from "@/components/system/FallbackPage";

export default [
  {
    path: "/",
    element: (
      <WorkoutProvider>
        <ClockProvider>
          <WorkoutManagementProvider>
            <SiteLayout />
          </WorkoutManagementProvider>
        </ClockProvider>
      </WorkoutProvider>
    ),
    errorElement: <FallbackForRouter />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <FormPageLayout />,
        children: [
          {
            path: "add",
            element: <AddPage />,
          },
          {
            path: "edit/:timerId",
            element: <EditPage />,
          },
        ],
      },
      {
        path: "docs",
        element: <DocumentationPage />,
      },
    ],
  },
];
