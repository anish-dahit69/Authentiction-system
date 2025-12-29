import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import NoLayout from "../components/layout/noLayout";
import { authRoutes } from "./AuthRoutes";
import { publicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { ProtectedRoute } from "./ProtectedRoute";

const routesConfig = [
  // Public pages with layout
  {
    element: <MainLayout />,
    children: publicRoutes,
  },

  // Auth pages without layout
  {
    element: <NoLayout />,
    children: authRoutes,
  },

  // Protected pages with layout
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: PrivateRoutes,
      },
    ],
  },
];

const router = createBrowserRouter(routesConfig);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
