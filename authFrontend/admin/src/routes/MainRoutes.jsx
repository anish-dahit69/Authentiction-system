import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import AdminLayout from "../components/layouts/AdminLayout";

const routesConfig = [
  // Public pages with layout

  // Redirect root "/" → /admin/dashboard
  {
    path: "/",
    element: (
      <Navigate
        to="/admin"
        replace
      />
    ),
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: AdminRoutes,
  },

  // Auth pages without layout
  // {
  //   element: <NoLayout />,
  //   children: authRoutes,
  // },

  // // Protected pages with layout
  // {
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       element: <MainLayout />,
  //       children: PrivateRoutes,
  //     },
  //   ],
  // },
];

const router = createBrowserRouter(routesConfig);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
