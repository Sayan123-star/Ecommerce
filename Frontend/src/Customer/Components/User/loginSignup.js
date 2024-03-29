import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../User/loginSign.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../../actions/User.action';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
// The coponent is for login an sign up
const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,islogged, error} = useSelector(state=>state.user)
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTabs = useRef(null);
  const redirect = window.location.search ? window.location.search.split("=")[1]: "/account"
  //Using state to set the user data fr registering
    const [user, setUser] = useState({
      name:"",
      email:"",
      password:""
    });
    const {name,email,password}=user
    const [picture, setPicture] = useState();
    const [avatarPreview, setAvatarPreview] = useState(require("../../Img/profile.jpg"));

    const registerSubmit =(e)=>{
      e.preventDefault()
      const myForm = new FormData();
      myForm.set("name", name)
      myForm.set("email", email)
      myForm.set("password", password)
      myForm.append("picture", picture)
      dispatch(register(myForm))
    }
    //This onchange is to register a user with the profile picture
    const registerDataChange=(e)=>{
      if(e.target.name==="picture"){
        
        setAvatarPreview(e.target.files[0]);
        setPicture(e.target.files[0]);
        
      }else{
        setUser({...user, [e.target.name]: e.target.value})
        
      }
      
    }
// these state ase use to user login by email and password
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e)=>{
      e.preventDefault();
      dispatch(login(loginEmail, loginPassword))
    }
    useEffect(()=>{
      if(error){
        Swal.fire({
          icon: 'error',
          title: error
        })
        dispatch(clearErrors())
      }
      else if(islogged){
        
        navigate(redirect)
        
      }
      setLoginEmail('')
      setLoginPassword('')
    },[dispatch,error,islogged,navigate,redirect])
    // the switchTabs function is to swtch the two forms
    const switchTabs=(e,tab)=>{
        if(tab === 'login'){
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === 'register'){
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
  return (
    <>
    {loading ? (<Loader/>):
    (
      <>
        <div className='logSignContain'>
        <div className="logSignbox">
            <Form ref={loginTab} className='loginForm'  onSubmit={loginSubmit}>
            <div className="logSignToggle">
                    <p>LOGIN</p>
                </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" required value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" required value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" value="Login">
        Submit
      </Button>
      <p className=' d-flex'>If not yet registered please <p onClick={(e)=> switchTabs(e, "register")}>Sign Up</p></p>
    </Form>
    <Form ref={registerTab}  className='signupForm' encType='multipart/form-data' onSubmit={registerSubmit}>
    <p>REGISTER</p>
    <Form.Group className="mb-3">
        <Form.Control className='input' type="text" placeholder="Enter fullname" required name='name' value={name} onChange={registerDataChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className='input' type="email" placeholder="Enter email" required name='email' value={email} onChange={registerDataChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control className='input' type="password" placeholder="Password" required name='password' value={password} onChange={registerDataChange}/>
      </Form.Group>
        <Form.Group className="mb-3 d-flex" id="registerImg">
          <img  src={avatarPreview} alt={avatarPreview} />
        <Form.Control className='input' type="file" name='picture' accept="image/*" onChange={registerDataChange}/>
      </Form.Group>
      <Button variant="primary" type="submit" value="Register">
        Submit
      </Button>
    <p className=' d-flex'>If you are already registered please <p className='ms-2' onClick={(e)=> switchTabs(e, "login")}>Login</p></p>
    </Form>
        </div>
    </div>
      </>
    )
    }
    </>
  )
}

export default LoginSignup
