import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ShippingSteps from '../../Customer/Components/Cart/ShippingSteps';
import MetaData from '../../Customer/Components/MetaData';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/order.action';
import Loader from '../../Customer/Components/Loader';
import { Button, Form } from 'react-bootstrap';
import { UPDATE_ORDER_RESET } from '../../constants/order.constants';
import "./UpdateOrder.css"


const UpdateOrder = () => {
    const navigate = useNavigate();
    const params = useParams()
    const dispatch=useDispatch()
    const {order,error,loading} = useSelector((state)=>state.orderDetail)
    const {error:updateError, isUpdated} = useSelector((state)=>state.order)
    
    const [status, setStatus] = useState("");

    const updateOrderHandler=(e)=>{
        e.preventDefault();
        const upForm = new FormData();
        upForm.set("status",status)
        dispatch(updateOrder(params.id,upForm))
    }
    // This Effect is to update the order by id 
    useEffect(()=>{
        if(error){
            Swal.fire({
                icon: "error",
                title: error
            })
            dispatch(clearErrors())
        }
        if(updateError){
            Swal.fire({
                icon: "error",
                title: updateError
            })
            dispatch(clearErrors())
        }
        if(isUpdated){
            Swal.fire({
                icon: "success",
                title: "Order Updated Successfully"
            })
            // Resets the order details
            dispatch({type: UPDATE_ORDER_RESET})
        }
        dispatch(getOrderDetails(params.id))
    },[dispatch,Swal,error,params.id, isUpdated, updateError])

  return (
    <>
     <MetaData title="Update Product"/>
     <div className="dashboard">
        <SideBar/>
        <div style={{backgroundColor:"lightgray"}} className="upOrderContain">
        {loading?(<Loader/>):(
            <div className=" d-grid">
            <div>
                <div className="confirmShipArea orderGrid d-flex">
                    <h4>Shipping Info</h4>
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
                <div className="confirmCartItem">
                    <h4>All Cart Items: </h4>
                    <div className="confirmCartContain">
                        {order.orderItems &&
                        order.orderItems.map((item)=>(
                            <div key={item.product}>
                                <img src={item.image} alt="Product" />
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
                
                <Form className='createProductForm' encType='multipart/form-data' onSubmit={updateOrderHandler}>
                    <h5>Update Order</h5>
      <Form.Group className="mb-3">
      <Form.Select aria-label="Default select example" onChange={(e)=> setStatus(e.target.value)}>
      <option value="">Choose Category</option>
      {order.orderStatus === "Processing" && (<option value="Shipped">Shipped</option>)}
      {order.orderStatus === "Shipped" && (<option value="Delivered">Delivered</option>)}
      
    </Form.Select></Form.Group>
      <Button variant="primary" type="submit" disabled={loading? true : false || status===""?true:false} >
        Submit
      </Button>
        </Form>
                
            </div>
          </div>
        )}
        </div>
     </div> 
    </>
    
    
  )
}

export default UpdateOrder
