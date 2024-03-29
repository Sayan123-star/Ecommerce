import axios from "axios"
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/order.constants"
import { API_BASE_URL } from "../config"

// Create Order
export const createOrder = (order)=> async(dispatch,getState)=>{
    const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
      }
    try {
        dispatch({type:CREATE_ORDER_REQUEST})
        
          const {data}= await axios.post(`${API_BASE_URL}/api/order`,order,CONFIG_OB);
          dispatch({type: CREATE_ORDER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
}

// My Orders
export const myOrders = ()=> async(dispatch,getState)=>{
    const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
      }
    try {
        dispatch({type:MY_ORDER_REQUEST})
        
          const {data}= await axios.get(`${API_BASE_URL}/api/order/user`,CONFIG_OB);
          dispatch({type: MY_ORDER_SUCCESS,payload:data.loggedOrders})
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
}
//Get All Orders
export const retrivreAllOrders = ()=> async(dispatch,getState)=>{
    const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
      }
    try {
        dispatch({type: ALL_ORDERS_REQUEST})
        
          const {data}= await axios.get(`${API_BASE_URL}/api/order/admin`,CONFIG_OB);
          dispatch({type: ALL_ORDERS_SUCCESS,payload:data.allOrders})
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.error
        })
    }
}
// Update Order
export const updateOrder = (id,order)=> async(dispatch,getState)=>{
    const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
      }
    try {
        dispatch({type:UPDATE_ORDER_REQUEST})
        
          const {data}= await axios.put(`${API_BASE_URL}/api/order/admin/update/${id}`,order,CONFIG_OB);
          dispatch({type: UPDATE_ORDER_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
}
// Delete  Orders
export const deleteOrder = (id)=> async(dispatch,getState)=>{
    const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
      }
    try {
        dispatch({type:DELETE_ORDER_REQUEST})
        
          const {data}= await axios.delete(`${API_BASE_URL}/api/order/admin/delete/${id}`,CONFIG_OB);
          dispatch({type: DELETE_ORDER_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.error
        })
    }
}


// Order Details
export const getOrderDetails = (id)=> async(dispatch)=>{
    const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
      }
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})
        
          const {data}= await axios.get(`${API_BASE_URL}/api/order/admin/${id}`,CONFIG_OB);
         
          dispatch({type: ORDER_DETAILS_SUCCESS,payload:data.userOrder})
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.error
        })
    }
}



//Clear Errors
export const clearErrors= ()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}