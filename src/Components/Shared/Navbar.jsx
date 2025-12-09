import React from "react";
import logo from "../../assets/open-book_12743688.png";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100  w-11/12 mx-auto text-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold"
          >
            <li>
              <NavLink>Home</NavLink>
            </li>
            <li>
              <NavLink>Books</NavLink>
            </li>
            <li>
              <NavLink>DashBoard</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <img src={logo} className="w-10 h-10" alt="" />
          <a className=" text-xl text-primary font-bold">BookNest</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink>Books</NavLink>
          </li>
          <li>
            <NavLink>DashBoard</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-1">
        <button className="btn btn-soft btn-primary">Login</button>
        <button className="btn btn-soft btn-primary">Register</button>
      </div>
    </div>
  );
};

export default Navbar;
