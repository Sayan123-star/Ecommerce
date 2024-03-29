import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_DETAILS_RESET } from '../../constants/user.constants';
import { clearErrors, getUserDetail, updateUser } from '../../actions/User.action';
import { Button, Form } from 'react-bootstrap';
import SideBar from './SideBar';
import MetaData from '../../Customer/Components/MetaData';
import Swal from 'sweetalert2';
import Loader from '../../Customer/Components/Loader';

const UserUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {loading:updateLoad,error:updateError,isUpdated}=useSelector((state =>state.profile));
    const {loading,error,user}=useSelector((state =>state.userDetail));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(()=>{
// Setting user data with their id
        if(user && user._id !== params.id){
            dispatch(getUserDetail(params.id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
        if(error){
            Swal.fire({
                icon:"error",
                title:error
            })
            dispatch(clearErrors())
        }
        if(updateError){
            Swal.fire({
                icon:"error",
                title:updateError
            })
            dispatch(clearErrors())
        }
        if(isUpdated){
            Swal.fire({
                icon:"success",
                title:"Product Updated Successfully"
            })
            navigate("/admin/users")
            dispatch({type:UPDATE_USER_DETAILS_RESET})
        }
    },[dispatch,error,navigate,Swal, updateError, isUpdated,user,params.id])   
    //  Handling form submission 
    const updateUserSubmitHandle=(e)=>{
        e.preventDefault();
        const userForm = new FormData();
        userForm.set("name",name)
        userForm.set("email",email)
        userForm.set("role",role)
        
        dispatch(updateUser(params.id,userForm))
    }

  return (
    <>
     <MetaData title="Update User"/>
     <div className="dashboard">
        <SideBar/>
        <div className="newProductContain">
            {loading?(<Loader/>):(
                <Form className='createProductForm' onSubmit={updateUserSubmitHandle}>
                <h3>Update User</h3>
        <Form.Group className="mb-3">
            <Form.Control className='input' type="text" placeholder="Enter User's Name" required value={name} onChange={(e)=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Control className='input' type="text" placeholder="Enter User's Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            
          <Form.Group className="mb-3">
          <Form.Select aria-label="Default select example" value={role} onChange={(e)=> setRole(e.target.value)}>
          <option value="">Choose Category</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
          
        </Form.Select>
        </Form.Group>
          <Button variant="primary" type="submit" disabled={updateLoad? true : false || role===""? true:false} >
            Update
          </Button>
            </Form>
            )}
        
        </div>
     </div> 
    </>
  )
}

export default UserUpdate
