import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { clearErrors, myOrders } from '../../../actions/order.action';
import MetaData from '../MetaData';
import Loader from '../Loader';
import "./MyOrderPage.css";
import { Link, useParams } from 'react-router-dom';

const MyOrders = () => {
  const dispatch = useDispatch();
  const params =useParams();
  // Getting the data of the user orderswith details
  const {loading,error,loggedOrders}=useSelector((state)=>state.myOrders);
  const user=useSelector((state)=>state.user);

  useEffect(()=>{
    if(error){
      Swal.fire({
        icon:"error",
        title:error
      })
      dispatch(clearErrors());
    }
    dispatch(myOrders())
    
  },[dispatch,Swal,error])
  return (
    <>
    <MetaData title={`${user.user.name} - Orders`}/>
    <h5 id='myOrdersHeading'>{user.user.name}'s Orders</h5>
    {loading ? (<Loader/>):(
      <div className="orderPage">
      <Table className='mt-4' striped hover >
      <thead class="table-primary" id="tableHead" >
        <tr>
          <th>Order Id</th>
          <th>Status</th>
          <th>Item Quantity</th>
          <th>Amount</th>
          <th>View details</th>
        </tr>
      </thead>
      <tbody>
        {
          // map through the data and display it in the tabular form
        loggedOrders.map((item,index)=>{
          
            return(
              item.user == user.user._id ?
            (<tr>
            <td>{item._id}</td>
            <td
            className={item.orderStatus==="Delivered"? "text-success":"text-danger"}
            >{item.orderStatus}</td>
            <td>{item.orderItems.length}</td>
            <td>₹{item.totalPrice}</td>
            <td><Link to={`/order/${item._id}`}><FontAwesomeIcon icon={faLink} /></Link></td>
          </tr>):""
          
          )})}
      </tbody>
    </Table>
    </div>
    )}
    </>
  )
}

export default MyOrders
