import React, { useEffect, useState } from 'react'
import MetaData from '../../Customer/Components/MetaData'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import './CreateProduct.css'
import Swal from 'sweetalert2';
import { NEW_PRODUCT_RESET } from '../../constants/Products.constants';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../actions/Product.action';
import { Button, Form } from 'react-bootstrap';

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error,success}=useSelector((state =>state.newProduct));
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState([]);

    const categories=[
        "Shirt for Men",
        "Pant for Men",
        "Shirt for Women",
        "Pant for Women",
        "Shirt for Kids",
        "Pant for Kids",
      ]
    useEffect(()=>{
        if(error){
            Swal.fire({
                icon:"error",
                title:error
            })
        }
        if(success){
            Swal.fire({
                icon:"success",
                title:"Product Created Successfully"
            })
            navigate("/admin/dashboard")
            
        }
        dispatch({type:NEW_PRODUCT_RESET})
    },[dispatch,error,navigate,success])   
    
    const createProductSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('rating', rating);

      images.forEach((image) => {
          formData.append('images', image);
      });

      dispatch(createProduct(formData));
  };

  const createProductChange = (e) => {
      setImages([...e.target.files]);
  };
  return (
    <>
     <MetaData title="Create New Product"/>
     <div className="dashboard">
        <SideBar/>
        <div className="newProductContain">
        <Form className='createProductForm'  encType='multipart/form-data' onSubmit={createProductSubmit}>
    <Form.Group className="mb-3">
        <Form.Control className='input' type="text" placeholder="Enter Product's Name" required value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Control className='input' type="number" placeholder="Enter Product's Price" required onChange={(e)=>setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Control as="textarea" className='input' type="password" placeholder="Enter Product's Description"
         required value={description} onChange={(e)=>setDescription(e.target.value)}/>
      </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Control className='input' type="number" placeholder="Enter Product's Rating"
         required value={rating} onChange={(e)=>setRating(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Select aria-label="Default select example" onChange={(e)=> setCategory(e.target.value)}>
      <option value="">Choose Category</option>
      {categories.map((cate)=>(
        <option key={cate} value={cate}>
            {cate}
        </option>
      ))}
    </Form.Select>
    </Form.Group>
        <Form.Group className="mb-3" id="createProductFile">
        <Form.Control className='input' type='file' accept='image/*' multiple onChange={createProductChange} />
      </Form.Group>
        
      <Button variant="primary" type="submit" disabled={loading? true : false} >
        Submit
      </Button>
        </Form>
        </div>
     </div> 
    </>
  )
}

export default CreateProduct
