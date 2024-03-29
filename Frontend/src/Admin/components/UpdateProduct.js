import React, { useEffect, useState } from 'react'
import { clearErrors, getProductDetails, updateProduct } from '../../actions/Product.action';
import { UPDATE_PRODUCT_RESET } from '../../constants/Products.constants';
import MetaData from '../../Customer/Components/MetaData';
import SideBar from './SideBar';
import "./UpdateProduct.css"
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Updating each product by product id
    const {loading,error:updateError,isUpdated}=useSelector((state =>state.delupProduct));
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const {error,product} =useSelector((state)=>state.productDetail)
  // getting all product details
    const categories=[
        "Shirt for Men",
        "Pant for Men",
        "Shirt for Women",
        "Pant for Women",
        "Shirt for Kids",
        "Pant for Kids",
      ]


    useEffect(()=>{
// Setting the product details and updating them
        if(product && product._id !== params.id){
            dispatch(getProductDetails(params.id))
        }else{
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
        }


        if(error){
            Swal.fire({
                icon:"error",
                title:error
            })
            dispatch(clearErrors())
        }
        if(updateError){
            Swal.fire({
                icon:"error",
                title: updateError
            })
            dispatch(clearErrors())
        }
        if(isUpdated){
            Swal.fire({
                icon:"success",
                title:"Product Updated Successfully"
            })
            dispatch({type:UPDATE_PRODUCT_RESET})
            navigate("/admin/products")
            
        }
    },[dispatch,error,navigate,isUpdated,product,updateError])   
    // Setting the data through form data
    const updateProductSubmit=(e)=>{
        e.preventDefault();
        const productForm = new FormData();
        productForm.set("name",name)
        productForm.set("price",price)
        productForm.set("description",description)
        productForm.set("category",category)
        
        dispatch(updateProduct(params.id,productForm))
    }

  return (
    <>
     <MetaData title="Update Product"/>
     <div className="dashboard">
        <SideBar/>
        <div className="upProductContain">
        <Form className='createProductForm' encType='multipart/form-data' onSubmit={updateProductSubmit}>
          <h1>Edit Product</h1>
    <Form.Group className="mb-3">
        <Form.Control className='input' type="text" placeholder="Enter Product's Name" required value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Control className='input' type="number" placeholder="Enter Product's Price" required value={price}
        onChange={(e)=>setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Control as="textarea" className='input' type="password" placeholder="Enter Product's Description"
         required value={description} onChange={(e)=>setDescription(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Select aria-label="Default select example" value={category} onChange={(e)=> setCategory(e.target.value)}>
        {/* Mapping the categories */}
      <option value="">Choose Category</option>
      {categories.map((cate)=>(
        <option key={cate} value={cate}>
            {cate}
        </option>
      ))}
    </Form.Select></Form.Group>
      <Button variant="primary" type="submit" disabled={loading? true : false} >
        Submit
      </Button>
        </Form>
        </div>
     </div> 
    </>
  )
}

export default UpdateProduct
