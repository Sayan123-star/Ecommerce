import React, { useState } from 'react'
import "./Cart.css"
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsinCart, removeItems } from '../../../actions/cart.action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Getting all  the items in cart from reducer 
    const { cartItems }= useSelector((state)=>state.cart);
    //  Setting up a state to handle quantity of an item
    const increaseQuantity=(id,quantity)=>{
        const newqty = quantity+1;
        dispatch(addItemsinCart(id,newqty))
    }
    const decreaseQuantity=(id,quantity)=>{
        const newqty=quantity-1;
        if(quantity<=1){
            return;
        }
        dispatch(addItemsinCart(id,newqty))
    }
    // Handling to remove item in cart
    const deleteItems = (id)=>{
        dispatch(removeItems(id))
    }
    // Chaecking if the user is logged else  redirect user to login page
    const paymentHandler = ()=>{
        navigate("/login?redirect=payment")
    }
  return (
    <>
    {cartItems.length === 0 ?(
        <div className="emptyCart">
            <FontAwesomeIcon className="cart" icon={faCartPlus} />
            <h3>No Products in The cart</h3>
            <Link to={"/products"}><button className='btn btn-outline-primary'>Go shopping!!</button></Link>
        </div>
    ):(
         <>
         <div className='cartPage '>
           <div className="cartHead">
               <p>Product</p>
               <p>Quantity</p>
               <p>Subtotal</p>
           </div>
           {cartItems && cartItems.map((item)=>(
           <div className="cartContainer"> 
               <CartItem item={item} deleteItems={deleteItems}/>
               <div className="cartInput">
                   <button onClick={()=>decreaseQuantity(item.product,item.quantity)} className=' btn btn-primary'>-</button>
                   <input value={item.quantity} type="number" readOnly/>
                   <button onClick={()=>increaseQuantity(item.product,item.quantity)} className=' btn btn-primary '>+</button>
               </div>
               <p className='cartSubtotal'>
                  {`₹${item.price*item.quantity}`}
               </p>
           </div>
           ))}
           <div className="check">
               <div></div>
               <div className="checkbtn">
                {/* button to pay for product */}
                   <button onClick={paymentHandler} className=' btn btn-outline-primary'>Proceed to buy</button>
               </div>
           </div>
         </div>
       </>
    )}
    </>
   
  )
}

export default Cart
