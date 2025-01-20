import React, { useContext } from "react";
import useAuth from "../Provider/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // console.log(user, loading);

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;
