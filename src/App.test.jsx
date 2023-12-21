import { render, screen, waitFor } from "@testing-library/react";

import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { describe, test } from "vitest";

import routes from "@/routes/config";

const renderRoute = (route) => {
  const router = createMemoryRouter(routes, { initialEntries: [route] });

  render(<RouterProvider router={router} />);
};

// Smell test the app
describe("App", () => {
  for (const route of ["/", "/add", "/docs", "/workout"]) {
    test(`renders ${route}`, async () => {
      renderRoute(route);

      await waitFor(() => {
        screen.getByTestId("main");
      });
    });
  }
});
