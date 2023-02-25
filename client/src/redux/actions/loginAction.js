



import { USER_LOGIN,GET_USER_INFO,GET_ADMIN_INFO } from "../constants/generalConstants";

export const loginAction = (data) => async (dispatch) => {
  try {
    console.log("1S");
    console.log("data",data);

    dispatch({
      type: USER_LOGIN,
      payload:data
    })

  } catch (error) {
    console.log(error);
  }
};

export const getUserinfoAction = (data) => async (dispatch) => {
  try {
    console.log("1S");
    console.log("data", data);

    dispatch({
      type: GET_USER_INFO,
      payload: data,
    });

    console.log("zzzz")
  } catch (error) {
    console.log(error);
  }
};



