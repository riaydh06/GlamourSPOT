import { combineReducers } from "redux";
import catagoryReducer from "./catagoryReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
const rootReducer = combineReducers({
  catagoryReducer,
  userReducer,
  productReducer,
});
export default rootReducer;
