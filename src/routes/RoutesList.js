import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/Common/Loader";
import NotFound from "../components/Common/NotFound";
import AdminUserListPage from "../pages/admin/AdminUser/List";
import EmployeeListPage from "../pages/admin/Employee/List";
import AdminBikeListPage from "../pages/admin/Bike/List";
import Login from "../components/Common/Login";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      <Route path="/admin">
        <Route index element={<Navigate to="admin-user/all" />} />
        <Route path="admin-user">
          <Route index element={<Navigate to="all" />} />
          <Route
            path="all"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <AdminUserListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="employee">
          <Route index element={<Navigate to="all" />} />
          <Route
            path="all"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <EmployeeListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="bike">
          <Route index element={<Navigate to="all" />} />
          <Route
            path="all"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <AdminBikeListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesList;
