import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginHandler } from "../redux/Slices/AuthSlice";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const isAuthenticated = useSelector((state) => {
    if (accessToken && !state.auth.isAuthenticated) {
      const accessTokenData = jwtDecode(accessToken);
      dispatch(loginHandler(accessTokenData?.data));
    }
    return accessToken || state.auth.isAuthenticated;
  });

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
