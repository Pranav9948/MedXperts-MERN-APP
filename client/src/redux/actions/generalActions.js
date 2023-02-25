import axios from 'axios';

import {

    SHOW_LOADING,HIDE_LOADING,GET_ADMIN_INFO
  
} from '../constants/generalConstants';


export const showLoading = () => async (dispatch) => {
  try {
   
      console.log("1S")

     dispatch({
       type: SHOW_LOADING
     });

  } catch (error) {
    
       console.log(error)
  }
};


export const HideLoading = () => async (dispatch) => {
  try {

    
      console.log("2h");

    dispatch({
      type: HIDE_LOADING,
    });
  } catch (error) {
    console.log(error);
  }
};



export const getAdminInfo = () => async (dispatch) => {
  try {
    
    const {data}=await axios.get("/api/users/getAdminDetails")


    dispatch({
      type:GET_ADMIN_INFO,
      payload: data,
    });

    console.log("zzzz");
  } catch (error) {
    console.log(error);
  }
};
