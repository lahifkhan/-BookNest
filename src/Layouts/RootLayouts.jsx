import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";

const RootLayouts = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayouts;
