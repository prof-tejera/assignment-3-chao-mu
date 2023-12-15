import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ours - Pages
import SiteLayout from "@/views/SiteLayout";
import HomePage from "@/views/HomePage";
import AddPage from "@/views/AddPage";
import EditPage from "@/views/EditPage";
import ErrorPage from "@/views/ErrorPage";
import DocumentationPage from "@/views/DocumentationPage";

// Ours - Contexts
import WorkoutProvider from "@/contexts/workout/WorkoutProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WorkoutProvider>
        <SiteLayout />
      </WorkoutProvider>
    ),
    errorElement: <ErrorPage />,
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

const App = () => <RouterProvider router={router} />;

export default App;
