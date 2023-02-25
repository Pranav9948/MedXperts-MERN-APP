import { USER_LOGIN,GET_USER_INFO } from "../constants/generalConstants";

export const loginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      console.log("1Rs");

      return { 
 
        userInfo:action.payload

      };

    

    default:
      return state;
  }
};


