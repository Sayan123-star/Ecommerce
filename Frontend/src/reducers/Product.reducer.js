import { searchProduct } from "../actions/Product.action";
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../constants/Products.constants";
// This reducer shows the products 
export const ProductReducer=((state = {products:[]},action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            case ADMIN_PRODUCT_REQUEST:
                case SEARCH_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerpage: action.payload.resultPerpage,
            }
            case SEARCH_PRODUCT_SUCCESS:
                return{
                    loading: false,
                    products: action.payload.data
                }

            
            case ADMIN_PRODUCT_SUCCESS:
                return{
                    loading: false,
                    products: action.payload
                }
        case ALL_PRODUCT_FAIL:
            case ADMIN_PRODUCT_FAIL:
                case SEARCH_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload,
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
// This reducer is use to create a new product from the front end
export const newProductReducer=((state = {product:{}},action)=>{
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success:action.payload.success,
                product: action.payload.product,
            }
        case NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                success:false
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
// This reducer is use to operate CRUD operation on the  products in the admin panel 
export const delupProductReducer=((state = {},action)=>{
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                isDeleted:false
            }
        case UPDATE_PRODUCT_RESET:
            return{
                ...state,
                isUpdated:false
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
// This reducer is use to show each product details 
export const ProductDetailReducer=((state = {product:{}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload,
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