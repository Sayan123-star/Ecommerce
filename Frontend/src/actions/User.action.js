import axios from "axios";
import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_DETAILS_FAIL, UPDATE_USER_DETAILS_REQUEST, UPDATE_USER_DETAILS_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/user.constants"
import { API_BASE_URL } from "../config";
// User Login
export const login = (email,password)=> async(dispatch)=>{

    try {
        dispatch({type:LOGIN_REQUEST});
        const {data}= await axios.post(`${API_BASE_URL}/api/login`,{email,password});
        
              //  Save token amd the user detils in local storage and Redux store
              localStorage.setItem("token", data.token)
              localStorage.setItem("user", JSON.stringify(data.user));
            
        dispatch({type:LOGIN_SUCCESS, payload:data.user})
        

    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload: error.response.data.error})
    }
}
// Register the user
export const register = (user)=> async(dispatch)=>{
 try {
    dispatch({type: REGISTER_REQUEST});
    const config = {headers:{"Content-Type": "multipart/form-data"}}
    const {data}= await axios.post(`${API_BASE_URL}/api/register`,user,config);
    //  Save token amd the user detils in local storage and Redux store
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user)); 
    dispatch({type: REGISTER_SUCCESS,payload: data.user})
    
 } catch (error) {
    dispatch({type:REGISTER_FAIL, payload: error.response.data.error})
 }
}
// User Loading 
export const getuser = ()=> async(dispatch)=>{

    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
            
          }
        dispatch({type:LOAD_USER_REQUEST});
        const {data}= await axios.get(`${API_BASE_URL}/api/me`,CONFIG_OB);
        dispatch({type:LOAD_USER_SUCCESS, payload:data.user})

    } catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload: error.response.data.error})
    }
}

// Update profile
export const updateProfile = (user)=> async(dispatch)=>{
    try {
       dispatch({type: UPDATE_USER_REQUEST});
       const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
        
      }
       const config = {headers:{"Content-Type": "multipart/form-data"}}
       const {data}= await axios.put(`${API_BASE_URL}/api//updateuserdetail`,user,CONFIG_OB,config);
       dispatch({type: UPDATE_USER_SUCCESS,payload: data.success})
  
    } catch (error) {
       dispatch({type:UPDATE_USER_FAIL, payload: error.response.data.error})
    }
   }

   // Update profile password
export const updatePass = (passwords)=> async(dispatch)=>{
    try {
       dispatch({type: UPDATE_PASSWORD_REQUEST});
       const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
        
      }
       const {data}= await axios.put(`${API_BASE_URL}/api/updateuser`,passwords,CONFIG_OB);
       dispatch({type: UPDATE_PASSWORD_SUCCESS,payload: data.success})
  
    } catch (error) {
       dispatch({type:UPDATE_PASSWORD_FAIL, payload: error.response.data.error})
    }
   }

   // Get all users 
export const getAllUsers = ()=> async(dispatch)=>{

    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
            
          }
        dispatch({type:ALL_USER_REQUEST});
        const {data}=await axios.get(`${API_BASE_URL}/api/allusers`,CONFIG_OB);
        dispatch({type:ALL_USER_SUCCESS, payload: data.users})

    } catch (error) {
        dispatch({type:ALL_USER_FAIL, payload: error.response.data.error})
    }
}
// Get user Details
export const getUserDetail = (id)=> async(dispatch)=>{

    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
            
          }
        dispatch({type:USER_DETAILS_REQUEST});
        const {data}=await axios.get(`${API_BASE_URL}/api/alluser/${id}`,CONFIG_OB);
        dispatch({type:USER_DETAILS_SUCCESS, payload: data.user})

    } catch (error) {
        dispatch({type:USER_DETAILS_FAIL, payload: error.response.data.error})
    }
}

//Update user Details
export const updateUser = (id,user)=> async(dispatch)=>{
    try {
       dispatch({type: UPDATE_USER_DETAILS_REQUEST});
       const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
        
      }
       const {data}= await axios.put(`${API_BASE_URL}/api/alluser/${id}`,user,CONFIG_OB);
       dispatch({type: UPDATE_USER_DETAILS_SUCCESS,payload: data.success})
  
    } catch (error) {
       dispatch({type:UPDATE_USER_DETAILS_FAIL, payload: error.response.data.error})
    }
   }

   //Delete user Details
export const deleteUser = (id)=> async(dispatch)=>{
    try {
       dispatch({type: DELETE_USER_REQUEST});
       const CONFIG_OB = {
        headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
        
      }
       const {data}= await axios.delete(`${API_BASE_URL}/api/alluser/${id}`,CONFIG_OB);
       dispatch({type: DELETE_USER_SUCCESS,payload: data.success})
  
    } catch (error) {
       dispatch({type:DELETE_USER_FAIL, payload: error.response.data.error})
    }
   }


//Clear Errors
export const clearErrors= ()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}