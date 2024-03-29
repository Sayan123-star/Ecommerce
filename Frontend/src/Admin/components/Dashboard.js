import React, { useEffect } from 'react'
import Sidebar from './SideBar.js'
import './dashboard.css'
import { Link } from 'react-router-dom'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, BarController, BarElement } from "chart.js";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/Product.action.js'
import { retrivreAllOrders } from '../../actions/order.action.js'
import { getAllUsers } from '../../actions/User.action.js'

const Dashboard = () => {
    // Getting all the deatils of products, orders and users as the role is admin
    const {products}=useSelector((state)=>state.products)
    const {allOrders}= useSelector((state)=> state.getAllOrders)
    const {users}= useSelector((state)=> state.allUsers)
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(getAdminProduct());
        dispatch(retrivreAllOrders());
        dispatch(getAllUsers())
    },[dispatch])

    let totalPrice = 0;
    //  Calculating the total price for all the orders in  progress
    allOrders && allOrders.forEach(item=>{
        totalPrice+=item.totalPrice;
    })
    let status=""
    let process=0
    let ship=0
    let deliver=0
    allOrders && allOrders.forEach(item=>{
        //  Updating the count based on the order status
        status=item.orderStatus;
        if(status==="Processing"){
            process++;
        }
        else if(status==="Shipped"){
            ship++;
        }
        else if(status==="Delivered"){
            deliver++;
        }
    })
// Creating a line graph to show toal amount earned
    const lineState={
        labels:["Initial Amount", "Amount Earned"],
        datasets:[
            {
                label:["TOTAL AMOUNT"],
                backgroundColor:["tomato"],
                hoverBackgroundColor:[`#ffa500`],
                data:[0, totalPrice]
            }
        ]
    }
    // Creating a bar graph to represent number items processing shipped delivered
    const barState = {
        labels: ["Processing", "Shipped", "Delivered"],
        datasets: [
            {
                label:["Order Status"],
                backgroundColor:["tomato","yellow","rgb(18, 192, 18)"],
                hoverBackgroundColor:["tomato","yellowgreen","green"],
                data:[process,ship,deliver]
            }
        ]
    }
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title,
        Tooltip,
        Legend, BarController, BarElement );
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dasboardContainer'>
            <h2>Dashboard</h2>
            <div className="dashSumm">
                <div>
                    <p>Total Amount <br /> ₹{totalPrice}</p>
                </div>
                <div className="dashSummBox">
                    <Link to="/admin/products">
                        <p>Product</p>
                        <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{allOrders && allOrders.length}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>
            <div className="linechart">
                <Line data={lineState}/>
            </div> 
            <div className="linechart">
                <Bar data={barState}/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
