
import axios from "axios";
import { API_BASE_URL } from "../config";
import { ADD_TO_CART, CLEAR_CART, PAYMENT_CART_ITEM, REMOVE_CART_ITEM } from "../constants/cart.constants";
// ADDING ITEMS INTOTHE CART
export const addItemsinCart = (id, quantity) => async (dispatch, getState) => {
  const CONFIG_OB = {
    headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` } 
  }
  
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`,CONFIG_OB);
    
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        quantity
      }
    });
// ADDING CART ITEMS INTO THE LOCAL STORAGE
    const cartItems = getState().cart.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};
// Removing items form the storage
export const removeItems = (id)=> async(dispatch, getState)=>{
  
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  })
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems))
}
// Saving the payment and shipping information
export const savePaymentInfo =(data)=> async(dispatch)=>{
  dispatch({
    type: PAYMENT_CART_ITEM,
    payload: data,
  })
  localStorage.setItem("shippingInfo", JSON.stringify(data))
}
