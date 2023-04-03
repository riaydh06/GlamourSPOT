import { 
  LOAD_USER_DATA,
  GET_ALL_USERS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
 } from "../actions/types";


const state = {
  user: "",
  getAllUsers: [],
  deleteUser: false,

};

const userReducer = (mState = clone(state), action) => {
  switch (action.type) {
    case LOAD_USER_DATA:
      mState.user = clone(action.payload);
      return clone(mState);

      case GET_ALL_USERS:
      mState.getAllUsers = clone(action.payload.users);
      return clone(mState);

      case DELETE_USER_REQUEST:
      mState.deleteUser = false;
      return clone(mState);

      case DELETE_USER_SUCCESS:
      mState.deleteUser = true;
      return clone(mState);

    default:
      return clone(mState);
  }
};




export default userReducer;

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};
