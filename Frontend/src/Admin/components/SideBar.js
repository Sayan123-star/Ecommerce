import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <Link to="/admin/dashboard"><p>Dashboard</p></Link>
        <li className="nav-item dropdown">
            <p variant="success" className="nav-link dropdown-toggle text-black" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Products</p>
            <ul className="dropdown-menu">
                <li><Link className='nav-link text-black dropdown-item' to={"/admin/products"}><p>Products</p></Link></li>
                <li><Link className='nav-link text-black dropdown-item' to={"/admin/product"}><p>Create</p></Link></li>
            </ul>
        </li>
        <Link to='/admin/orders'><p>Orders</p></Link>
        <Link to='/admin/users'><p>Users</p></Link>
    </div>
  )
}

export default SideBar
