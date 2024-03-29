import { DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS } from "../constants/order.constants";
import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, CLEAR_ERRORS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_RESET,
    DELETE_USER_SUCCESS,
    LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS,
    UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_RESET,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/user.constants";
// User login, register, logout reducer
export const UserReducer=((state = {user:{}},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading: true,
                islogged: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                islogged: true,
                user: action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading: false,
                islogged: false,
                user: null, 
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading: false,
                islogged: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                loading: false,
                islogged: false,
                user: null
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})
// Profile reducer to implement CRUD operation in the user
export const profileReducer=((state = {},action)=>{
    switch (action.type) {

        case UPDATE_USER_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_DETAILS_REQUEST:
        case DELETE_ORDER_REQUEST:
        case DELETE_USER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_ORDER_SUCCESS:
            case  DELETE_USER_SUCCESS: 
            return{
                ...state, 
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_DETAILS_FAIL:
        case DELETE_ORDER_FAIL:
        case DELETE_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_DETAILS_RESET:
            return{
                ...state,
                isUpdated:false,
            }
        case DELETE_ORDER_RESET:
        case DELETE_USER_RESET:
            return{
                ...state,
                isDeleted: false,
            }
       
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})
// This reducer is use to show the registered user to the  admin 
export const allUsersReducer=((state = {users:[]},action)=>{
    switch (action.type) {

        case ALL_USER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case ALL_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                users: action.payload
            }
        case ALL_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})
// This reducer shows the admin the selected user details
export const oneUserReducer=((state = {user:{}},action)=>{
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_DETAILS_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})