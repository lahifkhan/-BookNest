import { Outlet, NavLink, useNavigate } from "react-router";
import { HiOutlineSparkles } from "react-icons/hi";
import { SiSimpleanalytics } from "react-icons/si";

import {
  FaBook,
  FaUser,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaUsersCog,
  FaFileInvoice,
  FaUserCog,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsFillBagHeartFill } from "react-icons/bs";

import useAuth from "../Hook/useAuth";
import logoImg from "../assets/open-book_12743688.png";
import useRole from "../Hook/useRole";
export default function DashboardLayout() {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const { role } = useRole();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-gradient-to-r from-primary to-secondary  text-white px-4 shadow-2xl">
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
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <HiOutlineSparkles className="text-warning text-3xl" />
            Good to see you, {user?.displayName}!
          </h2>
        </nav>

        {/* Page Content */}
        <div className="p-6 bg-[#D0E1E7] shadow-2xl h-full">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side  bg-gradient-to-r from-primary to-secondary text-white">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72  min-h-full p-4 flex flex-col">
          {/* LOGO + WEBSITE NAME */}
          <div className="flex items-center gap-3 mb-6 px-2">
            <img className="h-10 w-10" src={logoImg} alt="" />
            <h1 className="text-2xl font-bold">BookNest</h1>
          </div>

          {/* HOME BUTTON */}
          <ul className="menu space-y-2 mb-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <SiSimpleanalytics />
                Analytics
              </NavLink>
            </li>
          </ul>

          <h2 className="text-lg font-bold mb-2">Menu</h2>

          <ul className="menu space-y-2 flex-1">
            {/* USER LINKS */}
            {role == "user" && (
              <>
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
                    to="/dashboard/user/wishlists"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <BsFillBagHeartFill />
                    My Wishlists
                  </NavLink>
                </li>
              </>
            )}

            {/* LIBRARIAN LINKS */}

            {role === "librarian" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/librarian/add-book"
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
              </>
            )}

            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/manage-user"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FaUsersCog /> All Users
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/admin/manage-books"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FaBook /> Manage Books
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FaUser /> My Profile
              </NavLink>
            </li>
          </ul>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="btn  mt-4 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>
      </div>
    </div>
  );
}
