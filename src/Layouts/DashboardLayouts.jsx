import { Outlet, NavLink } from "react-router";
import {
  FaBook,
  FaUser,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaUsersCog,
  FaFileInvoice,
  FaUserCog,
} from "react-icons/fa";

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-300 px-4 shadow-md">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </nav>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-72 bg-base-200 min-h-full p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-4">Menu</h2>

          <ul className="menu space-y-2">
            {/* USER LINKS */}
            <li>
              <NavLink
                to="/dashboard/user/orders"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaShoppingCart /> My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/invoices"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaFileInvoice /> Invoices
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaUserCog /> My Profile
              </NavLink>
            </li>

            <div className="divider">Librarian</div>

            {/* LIBRARIAN LINKS */}
            <li>
              <NavLink
                to="/dashboard/add-book"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaPlus /> Add Book
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/librarian/my-books"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaBook /> My Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/librarian/orders"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaList /> Orders
              </NavLink>
            </li>

            <div className="divider">Admin</div>

            {/* ADMIN LINKS */}
            <li>
              <NavLink
                to="/dashboard/manage-user"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaUsersCog /> All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/manage-books"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaBook /> Manage Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaUser /> My Profile
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
