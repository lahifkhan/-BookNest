import React from "react";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";

const LibrarianRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <p>loading...</p>;
  }

  if (role !== "librarian") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default LibrarianRoutes;
