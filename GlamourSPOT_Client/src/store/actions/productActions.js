import axios from "axios";
import { hostName } from "../../hostConfig";
import SQLite from 'react-native-sqlite-storage';
import { 
    ADD_FAVORITE, 
    LOAD_FAVORITES, 
    REMOVE_FAVORITE, 
    LOADING_FAVORITE, 
    LOADING_PRODUCT_DETAILS, 
    LOAD_VIDEO_ID,
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    GET_SINGLE_PRODUCT

} from './types';

const FAVORITES_TABLE = 'favorites';
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${FAVORITES_TABLE}(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), brand VARCHAR(255), type VARCHAR(255), image VARCHAR(255), description VARCHAR(255), link VARCHAR(255))`;
const ALL_FAVORITES = `SELECT * FROM ${FAVORITES_TABLE}`;
const INSERT_NEW_FAVORITE = `INSERT INTO ${FAVORITES_TABLE} (name, brand, type, image, description, link) VALUES (?,?,?,?,?,?)`;
const DELETE_FAVORITE = `DELETE FROM ${FAVORITES_TABLE} WHERE id=?`;
const YOUTUBE_API_KEY = 'AIzaSyBr_lFKr6tjwpwj-jWX-X_Zc_uaOS2XNuY';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const loadFavorites = () => dispatch => {
    dispatch({ type: LOADING_FAVORITE });
    SQLite.openDatabase({ name: "GlomourSPOT.db", location: 'default' }).then((database) => {
        database.transaction((tx) => {
            // Create table if not exists
            tx.executeSql(CREATE_TABLE);
            // Get favorites
            tx.executeSql(ALL_FAVORITES).then(([tx, results]) => {
                // Prepare favorites list from db
                let favorites = [];
                for (let index = 0; index < results.rows.length; index++) {
                    const fav = results.rows.item(index);
                    favorites.push(fav);
                }
                const action = {
                    type: LOAD_FAVORITES,
                    payload: favorites
                };
                dispatch(action);
            });
        });
    });
};

export const addToFavorite = product => dispatch => {
    SQLite.openDatabase({ name: "GlomourSPOT.db", location: 'default' }).then((database) => {
        database.transaction((tx) => {
            tx.executeSql(INSERT_NEW_FAVORITE, [product.name, product.brand, product.type, product.image, product.description, product.link]).then(([tx, results]) => {
                const action = {
                    type: ADD_FAVORITE,
                    payload: { id: results.insertId, ...product },
                };
                dispatch(action);
            });
        });
    });
};

export const removeFavorite = favorite => dispatch => {
    SQLite.openDatabase({ name: "GlomourSPOT.db", location: 'default' }).then((database) => {
        database.transaction((tx) => {
            tx.executeSql(DELETE_FAVORITE, [favorite.id]).then(([tx, results]) => {
                const action = {
                    type: REMOVE_FAVORITE,
                    payload: favorite,
                };
                dispatch(action);
            });
        });
    });
};

export const getVideoUrl = searchKeywords => dispatch => {
    dispatch({ type: LOADING_PRODUCT_DETAILS });
    let requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=5&q=${searchKeywords}&key=${YOUTUBE_API_KEY}`
    axios.get(requestUrl).then(response => {
        const action = {
            type: LOAD_VIDEO_ID,
            payload: (response.data.items && response.data.items.length) ? `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}` : '',
        };
        dispatch(action);
    });
}


// Get all Products
  
export const getAllProducts = () => (dispatch) => {
    axios
      .get( hostName + '/api/makeupproducts/')
      .then((res) => {
            const action = {
                type: GET_ALL_PRODUCTS,
                payload: res.data
            };
            dispatch(action);
    })
    .catch((e) => true);
};

export const getSingleProduct = id => (dispatch) => {
    axios
      .get( hostName + '/api/makeupproducts/' + id)
      .then((res) => {
            const action = {
                type: GET_SINGLE_PRODUCT,
                payload: res.data
            };
            dispatch(action);
    })
    .catch((e) => true);
};

// Create product
  
export const fetchCreateProduct = (postData) => (dispatch) => {
    const request = {
        type: CREATE_PRODUCT_REQUEST
    };
    dispatch(request);
    axios
      .post( hostName + '/api/create-makeupproduct/',postData)
      .then((res) => {
            const action = {
                type: CREATE_PRODUCT_SUCCESS
            };
            dispatch(action);
    })
    .catch((e) => true);
};


// Update a product

export const fetchUpdateProduct = (id, postData) => (dispatch) => {
    const request = {
        type: UPDATE_PRODUCT_REQUEST
    };
    dispatch(request);
    axios
      .put( hostName + '/api/makeupproduct/' + id, postData)
      .then((res) => {
            const action = {
                type: UPDATE_PRODUCT_SUCCESS
            };
          dispatch(action);
    })
    .catch((e) => true);
};


//  Delete a product

export const fetchDeleteProduct = (id) => (dispatch) => {
    const request = {
        type: DELETE_PRODUCT_REQUEST
    };
    dispatch(request);
    axios
      .delete( hostName + '/api/makeupproducts/' + id)
      .then((res) => {
            const action = {
                type: DELETE_PRODUCT_SUCCESS
            };
            dispatch(action);
    })
    .catch((e) => true);
};