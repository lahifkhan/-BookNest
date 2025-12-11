import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Page/Home/Home";
import LogIn from "../Page/Auth/Login";
import Register from "../Page/Auth/Register";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import AddBook from "../Page/Dashboard/AddBook";
import MyProfile from "../Page/Dashboard/MyProfile";
import ManageUser from "../Page/Dashboard/ManageUser";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
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
    Component: DashboardLayouts,
    children: [
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "manage-user",
        Component: ManageUser,
      },
    ],
  },
]);

export default router;
