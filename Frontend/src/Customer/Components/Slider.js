//Importing all the dependencies
import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from "./Product/product.js"
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/Product.action.js'
import Loader from './Loader.js';
import "../Components/Product/productcard.css"
//Slider component to show images
const Slider=()=> {
  const dispatch = useDispatch();
  const {loading,error,products,productsCount}=useSelector(
    (state)=> state.products
  );
  useEffect(()=>{
    dispatch(getProduct());
  },[dispatch]);


  
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1260 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1259, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 793 },
          items: 3
        },
        smTablet: {
          breakpoint: { max: 792, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  return (
    <>
    {loading ? (<Loader/>):
    (<>
      <div className="container-fluid my-3">
        <p style={{fontSize:30, fontWeight:"bolder"}} className="phead1">Featured Products</p>
        {/* Create a card slider of the products with links */}
        <Carousel  responsive={responsive}>
            {products && products.map((product)=> <Product product={product}/>
            )}
        </Carousel>
      </div>
      </>)
    }
    </>
  )
}

export default Slider
