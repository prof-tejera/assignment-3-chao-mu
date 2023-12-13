import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Ours
import SiteLayout from "@/views/SiteLayout";
import HomePage from "@/views/HomePage";
import AddPage from "@/views/AddPage";
import DocumentationPage from "@/views/DocumentationPage";
import WorkoutProvider from "@/contexts/workout/WorkoutProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
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
        path: "docs",
        element: <DocumentationPage />,
      },
    ],
  },
]);

const App = () => (
  <WorkoutProvider>
    <RouterProvider router={router} />;
  </WorkoutProvider>
);

export default App;
