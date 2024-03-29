import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import MetaData from '../MetaData';
import "./profile.css"
import { Button } from 'react-bootstrap';

const Profile = () => {
    const navigate=useNavigate();
    // Getting the details of the logged user
    const{user,islogged,loading}=useSelector((state)=>state.user);
    useEffect(()=>{
        if(islogged===false){
            navigate("/");
        }
    },[navigate,islogged])
  return (
    <>
      {loading?(<Loader/>):(
        <>
        <MetaData title={`Profile: ${user.name}`}/>
        <div className='profileContainer'>
            <div>
                <h2>My Profile</h2>
                <img height={350} src={`http://localhost:5000/uploads/${user.picture}`} alt={user.name} />
                <Link to="/updateuserdetail"><Button className='mt-3' variant="primary">Edit Profile</Button></Link>
            </div>
            <div>
            <div>
                <h3>Full Name</h3>
                <p>{user.name}</p>
            </div>
            <div>
                <h3>Email</h3>
                <p>{user.email}</p>
            </div>
            <div>
                <Link to="/orders"><Button className='' variant='primary'> Orders</Button></Link>
                <Link to="/updatepassword"><Button variant='primary' className=''>Change Password</Button></Link>
            </div>
            </div>
            {/*  */}
        </div>
        </>
      )}
    </>
  )
}

export default Profile
