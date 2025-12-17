import React from "react";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";
import Loader from "../Components/Shared/Loader";

const LibrarianRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (role !== "librarian") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default LibrarianRoutes;
