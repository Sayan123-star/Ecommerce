import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT_SUCCESS } from '../../constants/user.constants'
import { useDispatch } from 'react-redux'
import Home from '../Pages/Home'

const UserOptions = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout=()=>{
    navigate("/")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(LOGOUT_SUCCESS);
  }
  return (
    <li className="nav-item dropdown">
                        <a variant="success" className="nav-link dropdown-toggle text-black" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                          Dashboard</a>
                        <ul className="dropdown-menu">
                          {user.role=="admin"?(<li><Link className='nav-link text-black dropdown-item' to={"/admin/dashboard"}>
                            Dashboard</Link></li>):("")}
                          <li><Link className='nav-link text-black dropdown-item' to={"/orders"}>Orders</Link></li>
                          <li><Link className='nav-link text-black dropdown-item' to={"/account"}>Account</Link></li>
                          <li><a href='' className='nav-link text-black dropdown-item' onClick={handleLogout}>Logout</a></li>
                        </ul>
                      </li>
  )
}

export default UserOptions
