import axios from "axios";
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/Products.constants";
import { API_BASE_URL } from "../config";

// Get all products
export const getProduct = (currentPage=1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get(`${API_BASE_URL}/api/products?page=${currentPage}`);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.error,
        });
    }
};
export const searchProduct = (keyword="") => async (dispatch) => {
    try {
        dispatch({type:SEARCH_PRODUCT_REQUEST})
        const data  = await axios.get(`${API_BASE_URL}/search?keyword=${keyword}`);
        dispatch({
            type: SEARCH_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT_FAIL,
            payload: error.response.data.error,
        });
    }
};


// Get the product details
export const getProductDetails= (id)=> async (dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
    const {data}= await axios.get(`${API_BASE_URL}/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.error,
        })
    }
}
// Creating a new product
export const createProduct= (product)=> async (dispatch)=>{
    try {
        dispatch({type: NEW_PRODUCT_REQUEST});
        const CONFIG_OB = {
            headers: {Authorization : `Bearer ${localStorage.getItem('token')}` } 
          }
          
    const {data}= await axios.post(`${API_BASE_URL}/api/createproduct`,product,CONFIG_OB);
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.error,
        })
    }
}
// Updating product details
export const updateProduct= (id,product)=> async (dispatch)=>{
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST});
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
          }
    const {data}= await axios.put(`${API_BASE_URL}/api/admin/products/${id}`,product,CONFIG_OB);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.error,
        })
    }
}
// Deleting the product
export const deleteOneProduct= (id)=> async (dispatch)=>{
    try {
        dispatch({type: DELETE_PRODUCT_REQUEST});
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
          }
          const config = {headers:{"Content-Type": "multipart/form-data"}}
    const {data}= await axios.delete(`${API_BASE_URL}/api/admin/product/${id}`,CONFIG_OB);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.error,
        })
    }
}
// Get the product in the admin pqnel for operation of CRUD
export const getAdminProduct= ()=> async (dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
          }
          const USER=localStorage.getItem('user')
        dispatch({type: ADMIN_PRODUCT_REQUEST});
    const {data}= await axios.get(`${API_BASE_URL}/api/admin/products`,CONFIG_OB,USER);
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.error,
        })
    }
}

export const clearErrors= ()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}