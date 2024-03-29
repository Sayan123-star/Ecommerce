//Importing all the needed dependencies
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../MetaData'
import ShippingSteps from './ShippingSteps.js'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import axios from "axios"
import "./PayProceed.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckLoading, faShippingFast,faCheck,faTruck,faCircleH, faHome, faBank, faCreditCard, faCreditCardAlt, faKey } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'
import { API_BASE_URL } from '../../../config.js'
import { clearErrors, createOrder } from '../../../actions/order.action.js'
import { clearCart } from '../../../actions/cart.action.js'
//Payment component to success the payment
const PaymentProceed = () => {
  const navigate = useNavigate();
    const orderInfo = JSON.parse(localStorage.getItem("orderInfo"))
    const dispatch = useDispatch();
    const stripe = useStripe()
    const elements = useElements();
    const payBtn = useRef(null);
    const {shippingInfo, cartItems}= useSelector((state)=>state.cart);
    const {user}=useSelector((state)=>state.user)
    const {error}=useSelector((state)=>state.newOrder)
// The amount to pay for the order
  const payData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  }

    const order ={
      shippingInfo,
      orderItems: cartItems,
      itemPrice: orderInfo.subtotal,
      delevaryPrice:orderInfo.deliveryPrice,
      totalPrice: orderInfo.totalPrice,
    }

    const payHandle = async(e)=>{
      e.preventDefault();
      payBtn.current.disabled =true;
      try {
        const CONFIG_OB = {
          headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          
        }
        // Posting data to the backend through axios
        const {data}= await axios.post(`${API_BASE_URL}/api/payment/process`,payData,CONFIG_OB);
        const client_secret = data.client_secret;
        if(!stripe || !elements)
        return;
        const result = await stripe.confirmCardPayment(client_secret,{
          payment_method:{
            card: elements.getElement(CardNumberElement),
            //getting the billing details 
            billing_details:{
              name:user.name,
              email: user.email,
              address:{
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pincode,
                country: shippingInfo.country,
              }
            }
          }
        })
        if(result.error){
          payBtn.current.disabled =false;
          Swal.fire({
            icon:"error",
            title:result.error.message
          })
        } else{
          if(result.paymentIntent.status==="succeeded"){

              order.paymentInfo={
              id:result.paymentIntent.id,
              status:result.paymentIntent.status
            }
            dispatch(createOrder(order))
            localStorage.removeItem("cartItems")
            navigate("/success");
          } else{
            Swal.fire({
              icon:"error",
              title:"Error occurred during payment"
            })
          }
        }
      } catch (error) {
        payBtn.current.disabled =false;
        Swal.fire({
          icon:"error",
          title:error.response.data.error
        })        
      }
      

    }
    useEffect(()=>{
      if(error){
        Swal.fire({
          icon:"error",
          title:error
        })
        dispatch(clearErrors())
      }
    }, [dispatch,error,Swal])
  return (
    <>
      <MetaData title="Payment Gateway"/>
      <ShippingSteps activeStep={2}/>
      <div className='paymentContain'>
        <Form className='paymentForm' onSubmit={(e)=> payHandle(e)}>
          <h6>Card Details</h6>
          <p>Please insert a indian currency card number "4000 0035 6000 0008"</p>
            <div>
              {/* The form to post card details */}
            <FontAwesomeIcon icon={faCreditCard}/>
            <CardNumberElement className='cardInput' />
            </div>
            <div>
            <FontAwesomeIcon icon={faCreditCardAlt}/>
            <CardExpiryElement className='cardInput'/>
            </div>
            <div>
            <FontAwesomeIcon icon={faKey}/>
            <CardCvcElement className='cardInput'/>
            </div>
            <input type='submit' value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='payFormBtn btn btn-outline-primary'/>
        </Form>
      </div>
    </>
  )
}

export default PaymentProceed
