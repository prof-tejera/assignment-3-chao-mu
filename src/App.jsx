import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ours
import SiteLayout from "@/views/SiteLayout";
import HomePage from "@/views/HomePage";
import AddPage from "@/views/AddPage";
import EditPage from "@/views/EditPage";
import ErrorPage from "@/views/ErrorPage";
import DocumentationPage from "@/views/DocumentationPage";
import PlanProvider from "@/contexts/plan/PlanProvider";
import WorkoutProvider from "@/contexts/workout/WorkoutProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PlanProvider>
        <SiteLayout />
      </PlanProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <WorkoutProvider>
            <HomePage />
          </WorkoutProvider>
        ),
      },
      {
        path: "add",
        element: <AddPage />,
      },
      {
        path: "edit/:timerId",
        element: <EditPage />,
      },
      {
        path: "docs",
        element: <DocumentationPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
