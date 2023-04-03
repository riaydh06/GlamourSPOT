import { 
    LOAD_FAVORITES, 
    ADD_FAVORITE, 
    REMOVE_FAVORITE, 
    LOADING_FAVORITE, 
    LOAD_VIDEO_ID, 
    LOADING_PRODUCT_DETAILS,
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT
} from "../actions/types";

const state = {
    favorites: [],
    productVideoUrl: '',
    isLoadingFavorites: false,
    isLoadingDetails: false,
    allProducts: [],
    singleProduct: {},
    createProduct: false,
    updateProduct: false,
    deleteProduct: false
};

const productReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case LOAD_FAVORITES:
            mState.favorites = clone(action.payload);
            mState.isLoadingFavorites = false;
            return clone(mState);
        case ADD_FAVORITE:
            let favorites = mState.favorites;
            favorites.push(action.payload);
            mState.favorites = favorites;
            return clone(mState);
        case REMOVE_FAVORITE:
            favorites = mState.favorites;
            let index = favorites.indexOf(action.payload);
            favorites.splice(index, 1);
            mState.favorites = favorites;
            return clone(mState);
        case LOADING_FAVORITE:
            mState.isLoadingFavorites = true;
            return clone(mState);
        case LOADING_PRODUCT_DETAILS:
            mState.isLoadingDetails = true;
            return clone(mState);
        case LOAD_VIDEO_ID:
            mState.productVideoUrl = action.payload;
            mState.isLoadingDetails = false;
            return clone(mState);
        case GET_ALL_PRODUCTS:
            mState.allProducts = action.payload.products;
            return clone(mState);
        case GET_SINGLE_PRODUCT:
            mState.allProducts = action.payload.products;
            return clone(mState);
        case CREATE_PRODUCT_REQUEST:
            mState.createProduct = false;
            return clone(mState);
        case CREATE_PRODUCT_SUCCESS:
            mState.createProduct = true;
            return clone(mState);
        case UPDATE_PRODUCT_REQUEST:
            mState.updateProduct = false;
            return clone(mState);
        case UPDATE_PRODUCT_SUCCESS:
            mState.updateProduct = true;
            return clone(mState);
        case DELETE_PRODUCT_REQUEST:
            mState.deleteProduct = false;
            return clone(mState);
        case DELETE_PRODUCT_SUCCESS:
            mState.deleteProduct = true;
            return clone(mState);
        default:
            return clone(mState);
    }
};
export default productReducer;

const clone = obj => {
    return JSON.parse(JSON.stringify(obj));
};
