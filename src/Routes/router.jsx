import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Page/Home/Home";
import LogIn from "../Page/Auth/Login";
import Register from "../Page/Auth/Register";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import AddBook from "../Page/Dashboard/AddBook";
import MyProfile from "../Page/Dashboard/MyProfile";
import ManageUser from "../Page/Dashboard/ManageUser";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoutes";
import MyBooks from "../Page/Dashboard/MyBooks";
import EditBook from "../Page/Dashboard/EditBook";
import AllBooks from "../Page/AllBooks/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/books",
        Component: AllBooks,
      },
    ],
  },
  {
    path: "/login",
    Component: LogIn,
  },
  {
    path: "/register",
    Component: Register,
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-book",
        Component: AddBook,
      },

      {
        path: "librarian/my-books",
        Component: MyBooks,
      },

      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
