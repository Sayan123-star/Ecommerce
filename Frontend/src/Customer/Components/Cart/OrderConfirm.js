import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./OrderConfirm.css"
import MetaData from '../MetaData'
import ShippingSteps from './ShippingSteps.js'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart } from '../../../actions/cart.action.js'


const OrderConfirm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {shippingInfo,cartItems} = useSelector((state)=> state.cart)
    const {user}=useSelector((state)=> state.user)
    // setting the data of the item in cart reducer into the order reducer
    const subtotal = cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const deliveryPrice = subtotal>899?0:65;
    const totalPrice = subtotal+deliveryPrice;
    const address = `${shippingInfo.country}, ${shippingInfo.state},
    ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}`

// Setting in the orderInfo localStorage
    const proceedPay=()=>{
        const data ={
            subtotal, deliveryPrice, totalPrice
        }
        localStorage.setItem("orderInfo",JSON.stringify(data));
        
        navigate("/process/payment")
    }
    
  return (
    <>
      <MetaData title="Confirm Order"/>
      <ShippingSteps activeStep={1}/>
      <div className="confirmOrderPage">
        <div>
            <div className="confirmShipArea">
                <h4>Shipping Info</h4>
                <div className="confirmShipAreaBox">
                    <div>
                        <p>Name: </p>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <p>Phone Number: </p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address: </p>
                        <span>{address}</span>
                    </div>
                </div>
            </div>
            <div className="confirmCartItems">
                <h4>All Cart Items: </h4>
                <div className="confirmCartContain">
                    {cartItems &&
                    cartItems.map((item)=>(
                        <div key={item.product}>
                            <img src={`http://localhost:5000/uploads/${item.image}`} alt="Product" />
                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                            <span>
                                {item.quantity} X ₹{item.price}={" "}
                                <strong>₹{item.price*item.quantity}</strong>                                                            
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div>
            <div className="orderSummary">
                <h4>Order Summary</h4>
                <div>
                <div>
                    <p>SubTotal</p>
                    <span>₹{subtotal}</span>
                </div>
                <div>
                    <p>Delivery Price</p>
                    <span>₹{deliveryPrice}</span>
                </div>
                </div>
                <div className='orderSummaryTotal'>
                    <p>
                        <strong>Total</strong>
                    </p>
                    <span>₹{totalPrice}</span>
                </div>
                <button className="btn btn-outline-primary" onClick={proceedPay}>Proceed to payment</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default OrderConfirm
