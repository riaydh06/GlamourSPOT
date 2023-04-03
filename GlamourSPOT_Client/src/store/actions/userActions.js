import axios from "axios";
import { hostName } from "../../hostConfig";
// const hostName = "http://192.168.10.8:6000";
import { 
    GET_ALL_USERS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
} from "../actions/types";




  // Get all user
  
  export const getAllUsers = () => (dispatch) => {
    axios
      .get( hostName + '/api/auth/all-users/')
      .then((res) => {
            console.log(res)
            const action = {
                type: GET_ALL_USERS,
                payload: res.data
            };
            dispatch(action);
      })
      .catch((e) => true);
  };


  // Delete a user
  export const fetchDeleteUser = (id) => (dispatch) => {
      console.log(id)
    const request = {
        type: DELETE_USER_REQUEST
    };
    dispatch(request);
    axios
      .delete( hostName + '/api/auth/delete-user/'+id)
      .then((res) => {
          console.log(res);
            const action = {
                type: DELETE_USER_SUCCESS
            };
          dispatch(action);
      })
      .catch((e) => true);
  };