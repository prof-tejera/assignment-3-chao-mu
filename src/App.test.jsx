import { render } from "@testing-library/react";

import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { describe, test } from "vitest";

import routes from "@/routes/config";

const renderRoute = (route) => {
  const router = createMemoryRouter(routes, { initialEntries: [route] });

  render(<RouterProvider router={router} />);
};

// Smell test the app
describe("App", () => {
  test("renders basic routes", () => {
    const routes = ["/", "/add", "/docs"];

    routes.forEach((route) => renderRoute(route));
  });
});
