// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// react-error-boundary
import { ErrorBoundary } from "react-error-boundary";

// Ours - Pages
import SiteLayout from "@/views/SiteLayout";
import HomePage from "@/views/HomePage";
import AddPage from "@/views/AddPage";
import EditPage from "@/views/EditPage";
import DocumentationPage from "@/views/DocumentationPage";

// Ours - Contexts
import { WorkoutProvider } from "@/contexts/WorkoutContext";
import { ClockProvider } from "@/contexts/ClockContext";

// Ours - Components
import {
  FallbackForRouter,
  FallbackComponent,
} from "@/components/system/FallbackPage";

const onReset = () => {
  window.location.reload();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WorkoutProvider>
        <ClockProvider>
          <SiteLayout />
        </ClockProvider>
      </WorkoutProvider>
    ),
    errorElement: <FallbackForRouter onReset={onReset} />,
    children: [
      {
        index: true,
        element: <HomePage />,
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

const App = () => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onReset={onReset}>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export default App;
