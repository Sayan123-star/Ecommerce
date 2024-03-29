import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import "./productcard.css"
import Loader from '../Loader';
import { getProduct, searchProduct } from '../../../actions/Product.action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Product from './product';

const categories=[
  "Shirt for Men",
  "Pant for Men",
  "Shirt for Women",
  "Pant for Women",
  "Shirt for Kids",
  "Pant for Kids",
]
// This component is use to show all the products with proper pagination functionality
const Productcard=()=> {
  const match =useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {loading, products, productsCount, resultPerpage}= useSelector((state)=> state.products);
  
  const [keyword, setKeyword] = useState("");
  const searchHandle=(e)=>{
    e.preventDefault();
    setKeyword(e);
    if (keyword!=""){
      dispatch(searchProduct(keyword));
    }else{
      window.location='/products'
    }
}
  const setCurrentPageNum = (e)=>{
    setCurrentPage(e)
  }
  useEffect(() => {
    dispatch(getProduct(currentPage))
  }, [dispatch, currentPage])
  
  return (
    <>
    {loading ? (<Loader/>):(
      <>
      <h2 className='phead'>Products</h2>
      {/* Search Function */}
      <div className="searchBar">
      <Form className="d-flex searchForm"  onSubmit={searchHandle}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="formbtn"
                    aria-label="Search"
                    onChange={(e)=>setKeyword(e.target.value)}
                    style={{  borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                  />
                  <Button 
                    style={{ borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} type="submit" className="formbtn1" variant="outline-success">Search</Button>
                </Form></div>
      <div className="products">
      
      {products && products.map((product)=> <Product product={product}/>
            )}
            </div>
            <div className='pageBox'>
              <Pagination activePage={currentPage}
              itemsCountPerPage={resultPerpage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNum}
              nextPageText='Next'
              prevPageText='Prev'
              firstPageText='First'
              lastPageText='Last'
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'
              />
            </div>
      </>
    )}
    </>
    
  )
}

export default Productcard