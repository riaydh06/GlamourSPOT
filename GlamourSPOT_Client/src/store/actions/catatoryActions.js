import axios from "axios";
import { hostName } from "../../hostConfig";
import { ADD_CURRENT_PRODUCT, LOAD_DATA, LOAD_PRODUCT_LIST, LOAD_SEARCHED_PRODUCTS, LOAD_USER_DATA, LOADING_PRODUCTS } from "./types";
// const hostName = "http://192.168.10.8:6000";

export const loadCatagories = () => dispatch => {
  axios
    .get(hostName + "/api/productCatagories")
    .then(res => {
      let catagories = res.data;
      const action = {
        type: LOAD_DATA,
        payload: catagories
      };
      dispatch(action);
    })
    .catch(err => true);
};


export const loadProductList = productName => dispatch => {
  dispatch({ type: LOADING_PRODUCTS });
  axios
    .post(hostName + "/api/productCatagoriesList", { productName: productName })
    .then(res => {
      const action = {
        type: LOAD_PRODUCT_LIST,
        payload: res.data
      };
      dispatch(action);
    })
    .catch(err => true);
};

export const addCurrentProduct = product => dispatch => {
  const action = {
    type: ADD_CURRENT_PRODUCT,
    payload: product
  };
  dispatch(action);
};

export const loadUser = user => dispatch => {
  const state = {
    type: LOAD_USER_DATA,
    payload: user
  };
  dispatch(state);
};

export const loadSearchedProducts = text => dispatch => {
  dispatch({ type: LOADING_PRODUCTS });
  axios
    .post(hostName + "/api/makeupproducts-bybrand", { brand: text })
    .then(res => {
      const action = {
        type: LOAD_SEARCHED_PRODUCTS,
        payload: res.data
      };
      dispatch(action);
    })
    .catch(err => true);
}