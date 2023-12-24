// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// react-error-boundary
import { ErrorBoundary } from "react-error-boundary";

import routes from "@/routes/config";

// Ours - Components
import { FallbackComponent } from "@/components/system/FallbackPage";

const router = createBrowserRouter(routes);

const App = () => (
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export default App;
