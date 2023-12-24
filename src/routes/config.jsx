// Ours - Routes - Pages
import History from "./History";
import Add from "./Add";
import Edit from "./Edit";
import Workout from "./Workout";
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
    id: "root",
    children: [
      {
        index: true,
        element: <History />,
      },
      {
        path: "workout",
        element: <Workout />,
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
