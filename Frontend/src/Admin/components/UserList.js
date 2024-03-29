import React, { useEffect } from 'react'
import { clearErrors, deleteUser, getAllUsers } from '../../actions/User.action';
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
//import { clearErrors, deleteOneProduct, getAdminProduct } from '../../actions/Product.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import './ProductList.css'
import Loader from '../../Customer/Components/Loader';
import MetaData from '../../Customer/Components/MetaData';
import {  Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import { Button } from '@material-ui/core';
import { DELETE_USER_RESET } from '../../constants/user.constants';
// import { DELETE_PRODUCT_RESET } from '../../constants/Products.constants';

const UserList = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate(); 
    const params = useParams();
    const {error, users,loading}= useSelector((state)=> state.allUsers)

    const {error:deleteError,isDeleted}= useSelector((state)=> state.profile)
    const delUserHandle =(id)=>{
      dispatch(deleteUser(id))
    }
    // This effect gets all the users and deletes user
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
            title: "User Deleted Successfully"
        })
        navigate("/admin/users")
            }
            dispatch(getAllUsers());
            // reset the user
            dispatch({type:DELETE_USER_RESET})
            
    },[dispatch,Swal,error,deleteError,navigate,isDeleted])
  return (
    <>
      <MetaData title={`All Users-Admin`}/>
      <div className="dashboard">
        <SideBar/>
        <div className="productListContain">
        <h5 id='allProductsHeading'>Users List</h5>
    
    <div className="allProductsPage">
    <Table className='mt-4' striped hover >
    <thead class="table-primary" id="tableHead" >
      <tr>
        <th>User Id</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
        <th>View details</th>
      </tr>
    </thead>
    <tbody>
      {
        // map through the data and display it in the tabular form
      users && users.map((item,index)=>{
        
          return(
          <tr>
          <td>{item._id}</td>
          <td>{item.email}</td>
          <td>{item.name}</td>
          <td className={item.role==="admin"?"text-success":"text-danger"}>{item.role}</td>
          <td ><Link to={`/admin/user/${item._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
          <Button onClick={()=>delUserHandle(item._id)}><FontAwesomeIcon icon={faTrash} /></Button></td>
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

export default UserList
