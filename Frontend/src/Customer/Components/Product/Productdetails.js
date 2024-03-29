import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import Product from './product'
import ReactStars from "react-rating-stars-component";
import "./product.css"
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../../actions/Product.action'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader';
import Swal from 'sweetalert2';
import { addItemsinCart } from '../../../actions/cart.action';
// This component is use to show the product details
const Productdetails = () => {
    const params =useParams();
    const dispatch= useDispatch();
    const {loading, product, error} = useSelector(
        (state)=> state.productDetail
    );
    const [quantity, setQuantity] = useState(1);
    
    useEffect(()=>{
        if(error){
            Swal.fire({
                icon:'error',
                title: error
            })
        }
        dispatch(getProductDetails(params.id))
    }, [error,dispatch, params.id])

    if (!product) {
        return <div>Loading...</div>; // Handle case when product is undefined
    }
// To show the ratings
    const options={
        edit: false,
        color: "rgba(0,0,0,0.1)",
        activeColor: "tomato",
        size: window.innerWidth<600?20:25,
        value: product.ratings,
        isHalf: true
    }
    // Increase and decrease  quantity of products 
    const increaseQuantity=()=>{
        let qty = quantity+1;
        setQuantity(qty);
    }
    const decreaseQuantity=()=>{
        if(quantity<=1)
            return;
        let qty = quantity-1;
        setQuantity(qty);
    }
    //  Add to cart functionality
    const handleAddtoCart=()=>{
        dispatch(addItemsinCart(params.id, quantity))
        Swal.fire({
            icon:"success",
            title: "Items Added to cart Successfully"
        })
    }
    
    return (
        <>
        {/* If loading true showing loader */}
        {loading ? (<Loader/>):(
             <>
             <div className='ProductDetails'>
                 <div>
                   <Carousel> 
                    {/* Showing  images in carousel using map function */}
                     {product.images && product.images.map((item, index) => (
                         <img className='CarouselImg' key={index} src={`http://localhost:5000/uploads/${item.url}`} alt={`Slide ${index + 1}`} />
                     ))}
                     </Carousel>
                     </div>
                 <div>
                    {/*  Product details are shown here */}
                     <div className='db-1'>
                         <h2>{product.name}</h2>
                         <p>{product._id}</p>
                     </div>
                     <div className='db-2'>
                         <ReactStars {...options}/>
                     </div>
                     <div className="db-3">
                         <h1>{`₹${product.price}`}</h1>
         
                         <div className="db-3-1">
                             <div className="db-3-1-1">
                                {/* decreasing and increasing quantity of the product */}
                                 <button onClick={decreaseQuantity} className=' btn btn-primary'>-</button>
                                 <input value={quantity} type="number" readOnly/>
                                 <button onClick={increaseQuantity} className=' btn btn-primary '>+</button>
                             </div>{" "}
                             {/*  Adding items into cart button */}
                             <Button variant="primary" className="ms-3" onClick={handleAddtoCart} ><FontAwesomeIcon className="cart text-info"
                             style={{marginLeft:5, marginRight:5, fontSize:20, verticalAlign:"middle"}}
                             icon={faCartShopping} />Add to Cart</Button>
                         </div>
                     </div>
                     <div className="db-4">
                         Description: <p>{product.description}</p>
                     </div>
                 </div>
             </div>
         </>
        )
        }
        </>
    )
}

export default Productdetails