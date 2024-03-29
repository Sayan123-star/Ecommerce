// Importing all the dependencies
import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './Customer/Components/Footer';
import Header from './Customer/Components/Header';
import Loader from './Customer/Components/Loader';
import ProductDetails from './Customer/Components/Product/Productdetails';
import Productcard from './Customer/Components/Product/productcard';
import Search from './Customer/Components/Product/search';
import LoginSignup from './Customer/Components/User/loginSignup';
import Home from './Customer/Pages/Home';
import store from './store';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { getuser } from './actions/User.action';
import UserOptions from './Customer/Components/useroption';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Customer/Components/User/profile';
import UpdateProfile from './Customer/Components/User/updateprofile';
import UpdateProfilePassword from './Customer/Components/User/uppropass';
import Cart from './Customer/Components/Cart/Cart';
import PaymentProcess from './Customer/Components/Cart/Payment'
import OrderConfirm from './Customer/Components/Cart/OrderConfirm'
import axios from 'axios';
import PaymentProceed from './Customer/Components/Cart/PaymentProceed'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import { API_BASE_URL } from './config.js';
import OrderSuccess from './Customer/Components/Cart/OrderSuccess'
import MyOrders from "./Customer/Components/Order/MyOrders"
import OrderDetails from "./Customer/Components/Order/OrderDetails.js"
import Dashboard from './Admin/components/Dashboard.js'
import ProductList from './Admin/components/ProductList.js'
import CreateProduct from './Admin/components/CreateProduct.js'
import UpdateProduct from './Admin/components/UpdateProduct.js'
import OrderList from './Admin/components/OrderList.js'
import UpdateOrder from './Admin/components/UpdateOrder.js'
import UserList from './Admin/components/UserList.js'
import UserUpdate from './Admin/components/UserUpdate.js'
function App() {
  const {islogged, user} =useSelector((state)=>state.user)
  // the state is responsible to store the api key
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch()
  async function getApiKey(){
    const CONFIG_OB = {
      headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
      
    }
    // getting the api key  from backend server using fetch request
    const {data}= await axios.get(`${API_BASE_URL}/api/stripeApiKey`,CONFIG_OB);
    setStripeApiKey(data.stripeApiKey);
  }
  

  useEffect(()=>{
    dispatch(getuser())
    getApiKey();
  },[dispatch])
  return (
    <div className="App">
      {/* Browser router to create virtual DOM that changes element without modifying them */}
      <BrowserRouter>
      {/* Header Component */}
      <Header/>
      
      {/* Routes accessed by all users and admins */}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products/:id" Component={ProductDetails} />
        <Route path="/products" Component={Productcard} />
        <Route path="/products/:keyword" Component={Productcard} />
        <Route path="/login" Component={LoginSignup} />
        <Route path="/login/payment" Component={PaymentProcess} />
        <Route path="/account" Component={Profile} />
        <Route path="/updateuserdetail" Component={UpdateProfile} />
        <Route path="/updatepassword" Component={UpdateProfilePassword} />
        <Route path="/cart" Component={Cart} />
        <Route path="/orders/confirm" Component={OrderConfirm} />
        <Route path="/success" Component={OrderSuccess} />
        <Route path="/orders" Component={MyOrders} />
      </Routes>
        {/* Routes that can be accessed only by the admin users */}
      {user && user.role==="admin"?(
      <Routes>
        <Route path="/admin/dashboard" Component={Dashboard} />
        <Route path="/admin/products" Component={ProductList} />
        <Route path="/admin/product" Component={CreateProduct} />
        <Route path="/admin/products/:id" Component={UpdateProduct} />
        <Route path="/admin/orders" Component={OrderList} />
        <Route path="/admin/order/:id" Component={UpdateOrder} />
        <Route path="/admin/users" Component={UserList} />
        <Route path="/admin/user/:id" Component={UserUpdate} />
      </Routes>
      ):(
        <Routes>
          <Route path="/products"  />
        </Routes>
      )}
      {/* Route to view the order details by order id */}
      <Routes>
      <Route path="/order/:id" Component={OrderDetails} />
      </Routes>
      {/* Elements and load stripe are used for stripe payment */}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes>
      <Route path = "/process/payment" Component={PaymentProceed}/>
      </Routes>
      </Elements>
      )}
    {/* Footer Component */}
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
