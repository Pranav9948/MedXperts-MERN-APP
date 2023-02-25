import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { loginAction,getUserinfoAction } from "../redux/actions/loginAction";
import { useDispatch } from "react-redux";
import { showLoading, HideLoading } from "../redux/actions/generalActions";

function ProtectedRoutes(props) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

 

  dispatch(showLoading());

  const getDetailsAPI = async () => {
    try {

    console.log("reached...")

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("doctorAppToken"),
        },
      };

      const { data } = await axios.get("/api/users/getUserInfoById", config);
     

      if (data.getUser) {
    
        dispatch(loginAction(data.getUser));
      } else {
       
        
      }

      dispatch(HideLoading());
    } catch (err) {
      console.log("err", err);
      dispatch(HideLoading());
      
    }
  };

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      console.log("api called")
      getDetailsAPI();
    }

    else{

      console.log("length >0")
    }

  }, [userInfo,getDetailsAPI]);

  if (localStorage.getItem("doctorAppToken")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoutes;
