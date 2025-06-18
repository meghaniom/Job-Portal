import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import JobListings from "./pages/Joblist";
import FirstPage from "./component/HomePage";
import JobDetailspage from "./pages/JobDetailspage";
import SavedJob from "./pages/SavedJob";
import Login from "./Register/Login";
import NotFound from "./Register/NotFound";
import "./App.css";
import { AuthProvider } from "./context/Authcontext";
import ProjectedRouter from "./Register/ProjectedRouter";
import JobApply from "./pages/JobApply";
import Applyjob from "./pages/Applyjob";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isLoggedIn = localStorage.getItem("token");

  return (
    <AuthProvider>
      {!isLoggedIn && isLoginPage}

      <Routes>
        {/* Login route is always public */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/firstpage" /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/firstpage"
          element={
            isLoggedIn ? (
              <ProjectedRouter>
                <FirstPage />
              </ProjectedRouter>
            ) : (
              <Navigate to="/noteFound" />
            )
          }
        />
        <Route
          path="/jobs"
          element={
            isLoggedIn ? (
              <ProjectedRouter>
                <JobListings />
              </ProjectedRouter>
            ) : (
              <Navigate to="/notefound" />
            )
          }
        />
        <Route
          path="/jobs/:id"
          element={
            isLoggedIn ? (
              <ProjectedRouter>
                <JobDetailspage />
              </ProjectedRouter>
            ) : (
              <Navigate to="/notefound" />
            )
          }
        />

        <Route
          path="/jobs/details/:id"
          element={
            isLoggedIn ? (
              <ProjectedRouter>
                <JobApply />
              </ProjectedRouter>
            ) : (
              <Navigate to="/notefound" />
            )
          }
        />

        <Route
          path="/saved"
          element={
            isLoggedIn ? (
              <ProjectedRouter>
                <SavedJob />
              </ProjectedRouter>
            ) : (
              <Navigate to="/notefound" />
            )
          }
        />
        <Route
          path="/apply/:id"
          element={
            isLoggedIn ? (
              <ProjectedRouter>
                <Applyjob />
              </ProjectedRouter>
            ) : (
              <Navigate to="/notefound" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppLayout;
