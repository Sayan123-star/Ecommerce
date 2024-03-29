// Impoting user model, errorHandler, bcrypt, jwt and senToken
const ErrorHandler = require("../util/errorhandler");
const CatchError = require("../middleware/catchAsync");
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config");
const sendToken = require("../util/jwttok");

//User registration
const register = CatchError(async(req,res,next)=>{
    const{name,email,password}=req.body;
    const picture = req.file.path;
    const path = picture.split('\\')[1];
    const user = await User.create({name,email,password,picture:path})
    
    sendToken(user,200,res,"User signed up Successfully")
})
//User login
const login= CatchError(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password"))
    }
    const user= await User.findOne({email:email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Credentials"))
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return next(new ErrorHandler("Invalid  Credentials!!"))
    }
    sendToken(user,200,res,"User Logged in Successfully")
})
// User Logout
const logout = CatchError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({message:"Logged out Successfully"})
})
// See user Profile
const getuser = CatchError(async(req,res,next)=>{
    const user= await User.findById(req.user.id)
    res.status(200).json({user})
})

//updateUser Password
const updatePass = CatchError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPass= await user.comparePassword(req.body.oldPassword);
    if(!isPass){
        return next(new ErrorHandler("Incorrect Password",400))
    }
    if(req.body.newPassword !==req.body.confirmPassword){
        return next(new ErrorHandler("Both passwords does not match",400))
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res,"User Password Updated Successfully")
})
// Updating other detals
const updateDetail = CatchError(async(req,res,next)=>{
    
    const newUserData= await {
        name: req.body.name,
        email: req.body.email
    };
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({success:true})
});
// See all users for Admin 
const getalluser = CatchError(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({succes:true,users})
})
// See user details for Admin
const getuserbyid = CatchError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`Id: ${req.params.id} does not exist`,400))
    }
    res.status(200).json({succes:true,user})
})
// Update user details for Admin
const updateUser = CatchError(async(req,res,next)=>{
    const newUserData={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role}
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({message:"User updated successfully",success:true})
})
//  Delete a user by Id from admin panel
const deleteUser = CatchError(async(req,res,next)=>{
    
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`Id: ${req.params.id} doesnot exist`,400))
    }
    await user.deleteOne();
    res.status(200).json({message:"User deleted successfully",success:true})
})

module.exports={
    register,
    login,
    logout,
    getuser,
    updatePass,
    updateDetail,
    getalluser,
    getuserbyid,
    updateUser,
    deleteUser
}