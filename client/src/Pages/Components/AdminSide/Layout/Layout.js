import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../Images/MedXpertsLogo.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Badge, Space } from "antd";
import { Navigate } from "react-router-dom";

import "./layout.css";

function Layout({children}) {


  const username = useSelector((state) => state.userInfo.userInfo?.username);
 
const unseenNotification = useSelector(
  (state) => state.userInfo.userInfo?.unseenNotifications
);




  let adminitemz = [
    {
      menu: " Home",
      icon: "fa-solid fa-house",
      path: "/",
    },

    {
      menu: "All users",
      icon: "fa-solid fa-user",
      path: "/showallusers",
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

  const menutoberendered=  adminitemz 

  return (
    <div className="full">
      <div className="layouts d-flex">
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

        <div className="content">
          <div className="header d-flex justify-content-between">
            <div className="header_Title"></div>

            <div className="header_Icon">
              <Badge
                count={unseenNotification ? unseenNotification.length : 0}
                style={{ backgroundColor: "green" }}
              >
                <Link to={'/notifications'}>
                  <i
                    class="fa-solid fa-bell"
                    
                  ></i>
                </Link>
              </Badge>
            </div>

            <div className="userName">
              <h4>{username}</h4>
            </div>
          </div>

          <div className="mainBody">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
