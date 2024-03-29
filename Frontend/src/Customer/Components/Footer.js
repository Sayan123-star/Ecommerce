import React from 'react'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <div className="bg-dark ">
        <div className="container my-3">
            <div className="row">
                <div className="col">
                <p className="text-white-50 text-center">Product Section</p>
                <Link to="/products" className=" d-block nav-link text-white text-center">All Products</Link>
                <Link to="/cart" className=" d-block nav-link text-white text-center">Cart</Link>
                </div>
                <div className="col">
                <p className="text-white-50 text-center">Orders Section</p>
                <Link to="/orders" className=" d-block nav-link text-white text-center">Orders</Link>
                </div>
                <div className="col">
                <p className="text-white-50 text-center">Links</p>
                <Link to="/" className=" d-block nav-link text-white text-center">Home</Link>
                <Link to="/login" className=" d-block nav-link text-white text-center">Login</Link>
                <Link to="/account" className=" d-block nav-link text-white text-center">Account</Link>
                </div>
            </div>
            <div className="card-footer justify-content-center">
                Copyright@SuperMart
            </div>
        </div>
        </div>
    );
}

export default Footer;