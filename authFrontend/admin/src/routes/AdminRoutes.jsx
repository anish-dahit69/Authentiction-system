import EditPage from "../pages/EditPage";
import ManageUsers from "../pages/ManageUsers";
import Overview from "../pages/Overview";
import Users from "../pages/Users";

export const AdminRoutes = [
  {
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "dashboard",
        element: <Overview />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-users/edit/:id",
        element: <EditPage />,
      },
    ],
  },
];
