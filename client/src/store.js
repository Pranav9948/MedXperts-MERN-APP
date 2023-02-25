import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  generalReducers,
  AdminInfoReducers,
} from "./redux/reducers/generalReducers";
import {
  loginReducers,
  userInfoReducers,
 
} from "./redux/reducers/loginReducers";

import {
  adminShowUsersReducers,
  adminDeleteUsersReducers,
  adminEditUsersReducers,
  adminUpdateUsersReducers,
  adminBlockUsersReducers,
  adminunBlockUsersReducers,
} from "./redux/reducers/adminReducers";


const reducer = combineReducers({
  general: generalReducers,
  userInfo: loginReducers,
  adminInfo: AdminInfoReducers,
  adminshowallusers: adminShowUsersReducers,
  adminDeleteUsers: adminDeleteUsersReducers,
  adminEditUsers: adminEditUsersReducers,
  adminUpdateUsers: adminUpdateUsersReducers,
  adminBlockUsers: adminBlockUsersReducers,
  admin_UnBlockUsers: adminunBlockUsersReducers,
});



const initialState = {
  
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
