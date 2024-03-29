import React from 'react'
import { Link } from 'react-router-dom'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./CartItem.css"
//
const CartItem = ({item, deleteItems}) => {
  return (
    <div className='CartItemCard'>
      <img src={`http://localhost:5000/uploads/${item.image}`}  alt="none" />
    <div>
    <Link className=' text-decoration-none' to={`/products/${item.product}`}>{item.name}</Link>
    <span>{`Price: ₹${item.price}`}</span>
    <p onClick={()=>deleteItems(item.product)}><FontAwesomeIcon className="cart" icon={faTrashCan} /></p>
    </div>
    </div>
  )
}

export default CartItem
