import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { clearErrors, getOrderDetails, orderDetail } from '../../../actions/order.action'
import Loader from '../Loader'
import MetaData from '../MetaData'
import './OrderDetail.css'

const OrderDetails = () => {

    const {order, error, loading} = useSelector((state)=>state.orderDetail)
    const params=useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        if(error){
            Swal.fire({
                icon:"error",
                title:error,
            })
            dispatch(clearErrors)
        }
        // Getting the order detauls
        dispatch(getOrderDetails(params.id))
    },[dispatch,Swal,error,params.id])
  return (
    <>
      {loading?(<Loader/>):(
        <>
        <MetaData title="Order details page"/>
        <div className="orderDetailsPage">
        <div>
            <div className="orderDetailContain">
                <h1>Order #{order && order._id}</h1>
                
                <div className="orderDetailContainBox">
                    <div>
                        <p>Name: </p>
                        <span>{order.user && order.user.name}</span> 
                    </div>
                    <div>
                        <p>Phone Number: </p>
                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address: </p>
                        <span>{order.shippingInfo &&
                        `${order.shippingInfo.country}, ${order.shippingInfo.state}, ${order.shippingInfo.address},
                        ${order.shippingInfo.city}, ${order.shippingInfo.pincode}`
                        }</span>
                    </div>
                </div>
                        <h4>Payment</h4>
                        <div className='orderDetailContainBox'>
                            <div>
                                <p className={order.paymentInfo &&
                                order.paymentInfo.status === "succeeded"
                                ?'text-success':'text-danger'
                                }>
                                    {order.paymentInfo &&
                                order.paymentInfo.status === "succeeded"
                                ?'Payment Success for the Items':'Payment for the Items is Due'
                                }
                                </p>
                            </div>
                            <div>
                                <p>Amount: </p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <h4>Order Status</h4>
                        <div className='orderDetailContainBox'>
                            <div>
                            <p
                            className={
                                order.orderStatus && order.orderStatus === "Delivered" ? "text-success":"text-danger"
                            }
                            >{order.orderStatus && order.orderStatus}</p>
                        </div>
                        </div>
            </div>
            <div className='orderCartItems'>
                <h4>Order Items: </h4>
                <div className='orderDetailCartContain'>
                    {order.orderItems &&
                    order.orderItems.map((item)=>(
                        <div key={item.product}>
                            <img src={`http://localhost:5000/uploads/${item.image}`} alt="Product" />
                            <Link to={`/products/${item.product}`}>{item.name}</Link>{" "}
                            <span>{item.quantity}X₹{item.price}={" "}<b>₹{item.price*item.quantity}</b></span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
      </div>
        </>
      )}
    </>
  )
}

export default OrderDetails
