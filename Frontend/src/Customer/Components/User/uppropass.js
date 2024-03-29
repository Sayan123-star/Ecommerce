import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../User/loginSign.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getuser, login, updatePass } from '../../../actions/User.action';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET} from '../../../constants/user.constants';
import MetaData from '../MetaData';
import Loader from '../Loader';
import './uppropass.css'
const UpdateProfilePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, isUpdated, loading} = useSelector((state)=>state.profile)
// Getting the old passwod value and the new and confirm passwords
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit =(e)=>{
      e.preventDefault()
      const myForm = new FormData();
      // setting the old, new and confirm password values
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      // Dispatching the values of the form
      dispatch(updatePass(myForm))
    }
 useEffect(()=>{
  if(error){
    Swal.fire({
      icon: 'error',
      title: error
    })
    dispatch(clearErrors())
  }
      if(isUpdated){
          Swal.update({
            icon: 'success',
            title: "Profile Updated Successfully"
          })
          dispatch({type: UPDATE_PASSWORD_RESET})
          navigate("/account");
          
        }
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      },[dispatch,error,isUpdated,navigate,Swal])
  return (
    <>
    {loading ? (<Loader/>):(
        <>
        <MetaData title='Update Profile'/>
            <div className='updatePasswordContain'>
            <div className="updatePasswordbox">
                <h2 className='updateHeading'>Update Profile</h2>
            <Form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
        <Form.Group className="mb-3">
          {/* All password values */}
            <Form.Control className='input' type="password" placeholder="oldPassword" required name='name' 
             onChange={(e)=>setOldPassword(e.target.value)} />
            </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control className='input' type="password" placeholder="newPassword" required name='name' 
             onChange={(e)=>setNewPassword(e.target.value)} />
            </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control className='input' type="password" placeholder="confirmPassword" required name='name' 
             onChange={(e)=>setConfirmPassword(e.target.value)} />
            </Form.Group>
            
          {isUpdated?(<Link to="/account"><Button variant="primary" type="submit" value="updatePassword">
            Submit
          </Button></Link>):(<Button variant="primary" type="submit" value="updatePassword">
            Submit
          </Button>)}
        </Form>
            </div>
            </div>
        </>
    )}
    </>
  )
}

export default UpdateProfilePassword
