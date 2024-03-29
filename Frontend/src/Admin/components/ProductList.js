import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { clearErrors, deleteOneProduct, getAdminProduct } from '../../actions/Product.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import './ProductList.css'
import MetaData from '../../Customer/Components/MetaData';
import {  Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import { Button } from '@material-ui/core';
import { DELETE_PRODUCT_RESET } from '../../constants/Products.constants';
// Creating a product list
const ProductList = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const params = useParams();
    const {error, products}= useSelector((state)=> state.products)
    const {error:deleteError,isDeleted}= useSelector((state)=> state.delupProduct)
    // Delete product by id
    const delProductHandle =(id)=>{
      dispatch(deleteOneProduct(id))
    }
    // Checking if any errors and deleting single product
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
        navigate("/admin/dashboard")
            }
            dispatch(getAdminProduct());
            dispatch({type:DELETE_PRODUCT_RESET})
            
    },[dispatch,Swal,error,deleteError,navigate,isDeleted])
  return (
    <>
      <MetaData title={`All Products-Admin`}/>
      <div className="dashboard">
        <SideBar/>
        <div className="productListContain">
        <h5 id='allProductsHeading'>Product List</h5>
    
    <div className="allProductsPage">
    <Table className='mt-4' striped hover >
    <thead class="table-primary" id="tableHead" >
      <tr>
        <th>Product Id</th>
        <th>Product Name</th>
        <th>Product Price</th>
        <th>View details</th>
      </tr>
    </thead>
    <tbody>
      {
        // map through the data and display it in the tabular form
      products.map((item,index)=>{
        
          return(
          <tr>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td ><Link to={`/admin/products/${item._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
          <Button onClick={()=>delProductHandle(item._id)}><FontAwesomeIcon icon={faTrash} /></Button></td>
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

export default ProductList
