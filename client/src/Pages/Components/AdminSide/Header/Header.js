import React from 'react'
import { useSelector } from 'react-redux';
import './header.css'

function Header() {


  const username = useSelector((state) => state.userInfo.userInfo?.username);
  return (
    <div className="header d-flex justify-content-between">
      <div className="header_Title"></div>

      <div className="header_Icon">
        <i class="fa-solid fa-bell"></i>
      </div>

      <div className="userName">
        <h4>{username}</h4>
      </div>
    </div>
  );


}

export default Header