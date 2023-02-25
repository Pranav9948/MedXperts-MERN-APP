import React from 'react'
import { Route, Routes } from "react-router-dom";
import EditUsers from './Pages/Components/AdminSide/adminPages/EditUsers/EditUsers';
import ShowAllUsers from './Pages/Components/AdminSide/adminPages/ShowAllUsers/ShowAllUsers';
import Notifications from './Pages/Components/AdminSide/Notifications/Notifications';
import ApplyDoctor from './Pages/Components/UsersSide/applyDoctor/ApplyDoctor';

import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/Login';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import PublicRoutes from './Routes/PublicRoutes';


function Routing() {



  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />
        {
          <Route
            path="/applyfor"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
        }
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <Notifications />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/showallusers"
          element={
            <ProtectedRoutes>
              <ShowAllUsers />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/editusers/:id"
          element={
            <ProtectedRoutes>
              <EditUsers/>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default Routing