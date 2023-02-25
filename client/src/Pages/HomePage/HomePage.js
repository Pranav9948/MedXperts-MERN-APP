import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


function HomePage() {

const  username=useSelector((state)=>state.userInfo.userInfo?.username)

console.log("879",username)

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("doctorAppToken"),
        },
      };

      const { data } = await axios.get("/api/users/getUserInfoById", config)


    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [username]);

  return
  
  <div>


  </div>;
}

export default HomePage;
