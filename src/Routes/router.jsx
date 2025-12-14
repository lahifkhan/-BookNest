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
import BookDetails from "../Page/AllBooks/BookDetails";
import MyOrders from "../Page/Dashboard/MyOrders/MyOrders";
import PaymentSuccess from "../Page/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Page/Dashboard/Payment/PaymentCancel";
import Invoices from "../Page/Dashboard/Invoices/Invoices";
import LibrarianOrders from "../Page/Dashboard/Orders/LibrarianOrders";
import AdminManageBooks from "../Page/Dashboard/ManageBooks/AdminManageBooks";
import Wishlist from "../Page/Dashboard/Wishlists/wishlist";

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
      {
        path: "/book-details/:id",
        Component: BookDetails,
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
        path: "user/orders",
        Component: MyOrders,
      },
      {
        path: "user/invoices",
        Component: Invoices,
      },
      {
        path: "user/wishlists",
        Component: Wishlist,
      },
      {
        path: "librarian/add-book",
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
        path: "librarian/orders",
        Component: LibrarianOrders,
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
      {
        path: "admin/manage-books",
        element: (
          <AdminRoute>
            <AdminManageBooks></AdminManageBooks>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
    ],
  },
]);

export default router;
