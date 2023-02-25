import { HIDE_LOADING, SHOW_LOADING,GET_ADMIN_INFO} from "../constants/generalConstants";

export const generalReducers = (state = {}, action) => {
  switch (action.type) {

    case SHOW_LOADING:

    console.log("1Rs")

      return { loading: true };


      case HIDE_LOADING:         

    console.log("1RH");
      return { loading: false };

   

    default:
      return state;
  }
};


export const AdminInfoReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_ADMIN_INFO:
      console.log("1Rs");

      return {
        adminInfo: action.payload,
      };

    default:
      return state;
  }
};







