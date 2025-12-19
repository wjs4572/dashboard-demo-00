
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ErrorsPage from "../pages/errors/page";
import AlertsPage from "../pages/alerts/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/alerts",
    element: <AlertsPage />,
  },
  {
    path: "/errors",
    element: <ErrorsPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
