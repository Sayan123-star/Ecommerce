import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../User/loginSign.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getuser, login, updateProfile } from '../../../actions/User.action';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './updateProfile.css'
import { UPDATE_USER_RESET } from '../../../constants/user.constants';
import MetaData from '../MetaData';
import Loader from '../Loader';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user)
    // Getting details fof the logged user
    const {error, isUpdated, loading} = useSelector(state=>state.profile)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileSubmit =(e)=>{
      e.preventDefault()
      const myForm = new FormData();
      myForm.set("name", name)
      myForm.set("email", email)
      dispatch(updateProfile(myForm))
    }
    // Setting the new name and email
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
        if(error){
          Swal.fire({
            icon: 'error',
            title: error
          })
          dispatch(clearErrors())
        }
        if(isUpdated){
                Swal.fire({
                  icon: 'success',
                  title: "Profile Updated Successfully"
                })
                dispatch(getuser());
          navigate("/account");
          dispatch({type: UPDATE_USER_RESET})
          
        }
      },[dispatch,error,user,isUpdated,navigate,Swal])
  return (
    <>
    {loading ? (<Loader/>):(
        <>
        <MetaData title='Update Profile'/>
            <div className='updateProfileContain'>
            <div className="updateProfilebox">
                <h2 className='updateHeading'>Update Profile</h2>
                {/* Form for updating */}
            <Form className='updateProfileForm'  onSubmit={updateProfileSubmit}>
        <Form.Group className="mb-3">
            <Form.Control className='input' type="text" placeholder="Enter fullname" required name='name' value={name} 
            
            onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control className='input' type="email" placeholder="Enter email" required name='email' value={email} 
            onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            
          <Button variant="primary" type="submit" value="updateProfile">
            Submit
          </Button>
        </Form>
            </div>
            </div>
        </>
    )}
    </>
  )
}

export default UpdateProfile
