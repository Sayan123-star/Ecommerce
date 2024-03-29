// Importing all dependencies
import { Button,  Form,  Offcanvas} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import './Header.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import UserOptions from './useroption';
import { useSelector } from 'react-redux';
// Hearder component for header functionality 
function Header() {
  // Getting all the states by useSelecter to get the user is logged  in or not, what is its role
  const {islogged, user} =useSelector((state)=>state.user)
  const {cartItems} = useSelector((state)=> state.cart)
  // using useNavigate to navigate the user to another component
  const navigate = useNavigate();

  
  return (
    <div className="bg-light">
      {/* Nav Bar creation login buttons, brand, offcanvas and searchbox */}
    <Navbar key='lg' expand='lg' className=" mb-3 bg-dark">
          <Container fluid>
            <Navbar.Brand href="#" style={{fontSize: "xx-large", color: "khaki"}} className="brandnav">SuperMart</Navbar.Brand>
            <Navbar.Toggle className="bg-light" aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas className="opacity-75" id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="end">
              <Offcanvas.Header closeButton>
                
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-grow-1 pe-5"></Nav>
                <Nav className="flex-grow-1 pe-5 justify-content-between">
                  <div></div>
                <div className="mt-2 d-flex">
                {/*Checking if the user is logged in*/}
                {islogged ? (null):(
                  <Link to={"/login"}>
                  <Button variant="outline-success">Login</Button></Link>
                 )
                 
                 }
                 {islogged ? (<Link className=' text-decoration-none d-flex' to="/cart">
                <FontAwesomeIcon className="cart" style={{marginLeft:5, fontSize:30, color:"green", verticalAlign:"middle"}}
                 icon={faCartShopping} /><p  style={{backgroundColor:"blue", color:"white", border: "1px solid blue", borderRadius:" 100%", width:"23px", textAlign:"center"}}>{`${cartItems.length}`}</p></Link>):
                 (
                  <Link className=' text-decoration-none d-flex' to="/cart">
                <FontAwesomeIcon className="cart" style={{marginLeft:5, fontSize:30, color:"green", verticalAlign:"middle"}}
                 icon={faCartShopping} /></Link>
                 )}
                 
                </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        {/* Nav components */}
        <Nav className="bg-body-tertiary justify-content-center">
      <Nav.Item>
        <Nav.Link>
        <Link to={"/"} variant="success" style={{textDecoration: "none",verticalAlign:"middle"}} className="text-black">Home</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {/* Checking if the user is logged in */}
        {islogged?(""):(<Nav.Link><Link to={"/login"} style={{textDecoration: "none",verticalAlign:"middle"}}
        variant="success" href="#" className="text-black">
          Login
        </Link></Nav.Link>)}
        
      </Nav.Item >
      <Nav.Item>
      <Nav.Link>
        {/* This will on click to the link redirect to the products page */}
        <Link to={"/products"} variant="success" style={{textDecoration: "none"}} className="text-black">Products</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        {/* This will on click to the link redirect to the carts page */}
        <Link to={"/cart"} variant="success" style={{textDecoration: "none",verticalAlign:"middle"}}  className="text-black">
          Add to Cart
        </Link>
      </Nav.Link>
      </Nav.Item>
      {islogged ? (<UserOptions user={user}/>):("")}
    </Nav>
    </div>
  );
}

export default Header;