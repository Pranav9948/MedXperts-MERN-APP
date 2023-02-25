import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../Images/MedXpertsLogo.png';
import './sidebar.css'

function Sidebar() {



 const isAdmin = useSelector((state) => state.userInfo.userInfo?.isAdmin);

 let useritemz = [
   {
     menu: " Home",
     icon: "fa-solid fa-house",
     path: "/",
   },

   {
     menu: "Appointments",
     icon: "fa-solid fa-calendar-check",
     path: "/appointments",
   },

   {
     menu: "Apply Doctor",
     icon: "fa-solid fa-user-doctor",
     path: "/apply-doctor",
   },

   {
     menu: "Logout",
     icon: "fa-solid fa-right-from-bracket",
     path: "/logout",
   },
 ];

 let adminitemz = [
   {
     menu: " Home",
     icon: "fa-solid fa-house",
     path: "/",
   },

   {
     menu: "All users",
     icon: "fa-solid fa-user",
     path: "/allUsers",
   },

   {
     menu: "All Doctors",
     icon: "fa-solid fa-user-doctor",
     path: "/allDoctors",
   },

   {
     menu: "Logout",
     icon: "fa-solid fa-right-from-bracket",
     path: "/logout",
   },
 ];


  const location = useLocation();

  const menutoberendered = isAdmin ? adminitemz : useritemz;



  return (
    <div className="sidebar">
      <div className="sidebarHeading">
        <img src={logo}></img>
      </div>

      <div className={`sideBarOption  mt-3`}>
        {menutoberendered.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path}>
              <div className={`sidebarIcon ${isActive && "highlight"}`}>
                <i class={item.icon}></i> <span>{item.menu}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar