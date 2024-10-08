import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/Common/Loader";
import NotFound from "../components/Common/NotFound";
import AdminUserListPage from "../pages/AdminUser/List";
import EmployeeListPage from "../pages/Employee/List";
import AdminBikeListPage from "../pages/Bike/List";
import AdminBikeAssemblyListPage from "../pages/BikeAssembly/List";
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
        <Route index element={<Navigate to="bike-assembly/all" />} />
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
        <Route path="bike-assembly">
          <Route index element={<Navigate to="all" />} />
          <Route
            path="all"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <AdminBikeAssemblyListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route path="/employee">
        <Route index element={<Navigate to="bike-assembly/all" />} />
        <Route path="bike-assembly">
          <Route index element={<Navigate to="all" />} />
          <Route
            path="all"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <AdminBikeAssemblyListPage />
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
