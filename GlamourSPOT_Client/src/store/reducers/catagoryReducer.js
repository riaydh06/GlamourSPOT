import { ADD_CURRENT_PRODUCT, LOAD_DATA, LOAD_PRODUCT_LIST, LOAD_SEARCHED_PRODUCTS, LOADING_PRODUCTS } from "../actions/types";

const state = {
  catagories: [],
  currentProducts: [],
  curentSingleProduct: "",
  searchedProducts: [],
  isLoadingProducts: false,
};

const catagoryReducer = (mState = clone(state), action) => {
  switch (action.type) {
    case LOAD_DATA:
      mState.catagories = clone(action.payload);
      return clone(mState);

    case LOAD_PRODUCT_LIST:
      mState.currentProducts = clone(action.payload);
      mState.isLoadingProducts = false;
      return clone(mState);

    case ADD_CURRENT_PRODUCT:
      mState.curentSingleProduct = clone(action.payload);
      return clone(mState);
    case LOAD_SEARCHED_PRODUCTS:
      mState.searchedProducts = clone(action.payload);
      mState.isLoadingProducts = false;
      return clone(mState);
    case LOADING_PRODUCTS:
      mState.searchedProducts = [];
      mState.isLoadingProducts = true;
      return clone(mState);
    default:
      return clone(mState);
  }
};
export default catagoryReducer;

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};
