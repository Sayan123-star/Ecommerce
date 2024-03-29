const { JWT_SECRET } = require("../config");
const User = require("../model/user.model");
const ErrorHandler = require("../util/errorhandler");
const catchAsync = require("./catchAsync")
const jwt = require("jsonwebtoken")

const islogged = catchAsync( async(req,res,next)=>{
    const {authorization} = req.headers;
    //auth= Bearer 'json token'
    if(!authorization){
        return res.status(401).send({error: "The user is not logged in"})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error,payload)=>{
        if(error){
            return res.status(401).send({error: "The user is not log in"})
        }
        const {_id} = payload;
        User.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();// Goes to the next middleware or goes to the REST API
        })
    })
})
// checks if the user  has admin rights 
const authAdinorUser = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,403
            ))
        }
        next();
    }
}
module.exports={islogged,authAdinorUser}