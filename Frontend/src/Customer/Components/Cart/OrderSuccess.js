import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'
import { clearCart } from '../../../actions/cart.action'
import { useDispatch, useSelector } from 'react-redux'

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const {loading,error,loggedOrders}=useSelector((state)=>state.myOrders);
  return (
    <div className='orderSuccess'>
      <FontAwesomeIcon icon={faCircleCheck} />
      <h6>Your order has been placed successfully</h6>
      <Link to="/orders"><button className='btn btn-outline-primary'>View Orders</button></Link>
    </div>
  )
}

export default OrderSuccess
