import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./productcard.css"
import ReactStars from "react-rating-stars-component";

const Product=({product})=> {
  //creating stars for ratings
  const options={
    edit: false,
    color: "rgba(0,0,0,0.1)",
    activeColor: "tomato",
    size: window.innerWidth<600?20:25,
    value: product.rating,
    isHalf: true
}

  return (
    // Create product card with product name, image.
      <Card className="card me-3 mt-2"  >
      <Card.Img className='cardImg' variant="top" src={`http://localhost:5000/uploads/${product.images[0].url}`} />
      <Card.Body className="textpart">
        <Card.Title className='textpart1'>{product.name}</Card.Title>
        <Card.Text  >
          <ReactStars {...options}/>{" "}
        </Card.Text>
        <Card.Text >{`₹${product.price}`}</Card.Text>
        <Link style={{textDecorationLine:"none"}} className="productCard" to={`/products/${product._id}`}>
        <Button variant="primary"><FontAwesomeIcon className="cart text-info cart1" icon={faEye} />View Product</Button></Link>
      </Card.Body>
    </Card>
    
  )
}

export default Product