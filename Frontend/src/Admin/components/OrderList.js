import React, { useEffect } from 'react'
import { clearErrors, deleteOrder, retrivreAllOrders } from '../../actions/order.action';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./OrderList.css"
import Swal from 'sweetalert2';
import MetaData from '../../Customer/Components/MetaData';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ORDER_RESET } from '../../constants/order.constants';

const OrderList = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const params = useParams();
    // Getting all orders ofthe registered users by the admin
    const {error, allOrders}= useSelector((state)=> state.getAllOrders)
    const {error:deleteError,isDeleted}= useSelector((state)=> state.order)
    // Deleting  an order  using its id
    const delOrderHandle =(id)=>{
      dispatch(deleteOrder(id))
    }
    // This Effect is to delete and check any errors
    useEffect(()=>{
        if(error){
        Swal.fire({
          icon:"error",
          title:error
        })
        dispatch(clearErrors())
            }
            if(deleteError){
              Swal.fire({
              icon:"error",
              title:deleteError
        })
        dispatch(clearErrors())
            }
            if(isDeleted){
              Swal.fire({
              icon:"success",
              title: "Product Deleted Successfully"
        })
        
        navigate("/admin/orders")
            }
            // This dispatches all orders
            dispatch({type: DELETE_ORDER_RESET})
            dispatch(retrivreAllOrders());
            
            
            
    },[dispatch,Swal,error,deleteError,navigate,isDeleted])
  return (
    <>
      <MetaData title={`All Orders-Admin`}/>
      <div className="dashboard">
        <SideBar/>
        <div className="productListContain">
        <h5 id='allProductsHeading'>Product List</h5>
    
    <div className="allProductsPage">
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
       allOrders && allOrders.map((item,index)=>{
        
          return(
          <tr>
          <td>{item._id}</td>
          <td
            className={item.orderStatus==="Delivered"? "text-success":"text-danger"}
            >{item.orderStatus}</td>
          <td>{item.orderItems.length}</td>
          <td>{item.totalPrice}</td>
          <td ><Link to={`/admin/order/${item._id}`}><FontAwesomeIcon icon={faEdit} /></Link>{" "}
          <FontAwesomeIcon className='btn btn-primary' icon={faTrash} onClick={()=>delOrderHandle(item._id)}/></td>
        </tr>
        
        )})}
    </tbody>
  </Table>
  </div>
        </div>
      </div>
    </>
  )
}

export default OrderList
