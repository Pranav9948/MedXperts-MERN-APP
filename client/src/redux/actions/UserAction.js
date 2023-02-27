import axios from "axios";
import {
  VIEWALL_DOCTORS_REQUEST,VIEWALL_DOCTORS_SUCCESS,VIEWALL_DOCTORS_FAIL
} from "../constants/userConstants";




   export const ViewAllApprovedDoctors = () => async (dispatch, getState) => {
     try {
       console.log("xc");

       dispatch({
         type: VIEWALL_DOCTORS_REQUEST,
       });

       const config = {
         headers: {
           Authorization: "Bearer " + localStorage.getItem("doctorAppToken"),
         },
       };

       const { data } = await axios.get(
         `/api/users/getAllApprovedDoctors`,
         config
       );

       dispatch({
         type: VIEWALL_DOCTORS_SUCCESS,
         payload: data,
       });
     } catch (error) {
       const message =
         error.response && error.response.data.message
           ? error.response.data.message
           : error.message;
       dispatch({
         type: VIEWALL_DOCTORS_FAIL,
         payload: message,
       });
     }
   };

