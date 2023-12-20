// Ours - Routes - Pages
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Documentation from "./Documentation";

// Ours - Routes - Layouts
import FormPageLayout from "./layouts/FormPageLayout";

// Ours - Components
import { FallbackForRouter } from "@/components/system/FallbackPage";

// Ours - Routes
import Root from "./Root";

export default [
  {
    path: "/",
    element: <Root />,
    errorElement: <FallbackForRouter />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <FormPageLayout />,
        children: [
          {
            path: "add",
            element: <Add />,
          },
          {
            path: "edit/:timerId",
            element: <Edit />,
          },
        ],
      },
      {
        path: "docs",
        element: <Documentation />,
      },
    ],
  },
];
