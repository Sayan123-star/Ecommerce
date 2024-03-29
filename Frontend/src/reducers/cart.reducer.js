import {ADD_TO_CART, CLEAR_CART, PAYMENT_CART_ITEM, REMOVE_CART_ITEM} from "../constants/cart.constants"
// This reducer is use to store the cart details
export const cartReducer = (state = {cartItems: [], shippingInfo:{}}, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const item= action.payload;
            const isItemExist = state.cartItems.find(
                (i)=> i.product === item.product
            );
            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                    i.product === isItemExist.product? item : i)
                }
            }
            else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems : state.cartItems.filter((i)=> i.product !== action.payload)
            }
        case PAYMENT_CART_ITEM:
            return{
                ...state,
                shippingInfo : action.payload,
            }
        
        default:
           return state;
    }
}