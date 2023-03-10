import React from 'react'
import { Route, Routes } from "react-router-dom";
import DetailedDoctorverify from './Pages/Components/AdminSide/adminPages/DetailedDoctorverify/DetailedDoctorverify';
import EditUsers from './Pages/Components/AdminSide/adminPages/EditUsers/EditUsers';
import ShowAllUsers from './Pages/Components/AdminSide/adminPages/ShowAllUsers/ShowAllUsers';
import VerifyDoctor from './Pages/Components/AdminSide/adminPages/verifyDoctor/VerifyDoctor';
import Notifications from './Pages/Components/AdminSide/Notifications/Notifications';
import ApplyDoctor from './Pages/Components/UsersSide/applyDoctor/ApplyDoctor';
import DoctorProfilePage from './Pages/DoctorPages/DoctorProfilePage/DoctorProfilePage';

import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/Login';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import PublicRoutes from './Routes/PublicRoutes';
import ApplyDocForm from './Users/ApplyDoctorForm.js/ApplyDocForm';
import BookAppointment from './Users/BookAppointment/BookAppointment';
import UsersLayout from './Users/usersLayout/UsersLayout';
import ViewAllDoctors from './Users/ViewAllDoctors/ViewAllDoctors';


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
              <ApplyDocForm />
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
              <EditUsers />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/verifyDoctor"
          element={
            <ProtectedRoutes>
              <VerifyDoctor />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/detailedDoctorsVerifyPage/:id"
          element={
            <ProtectedRoutes>
              <DetailedDoctorverify />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Doctor/doctorProfilePage/:id"
          element={
            <ProtectedRoutes>
              <DoctorProfilePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/usersHome"
          element={
            <ProtectedRoutes>
              <UsersLayout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/viewalldoctors"
          element={
            <ProtectedRoutes>
              <ViewAllDoctors />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/bookDoctorAppointment/:id"  
          element={
            <ProtectedRoutes>
              <BookAppointment />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default Routing