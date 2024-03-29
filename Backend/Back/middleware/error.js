const ErrorHandler = require("../util/errorhandler");

module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
    if(error.name==="CastError"){
        const message= `Resource not found. Invalid: ${error.path}` ;
        error = new ErrorHandler(message, 400)
    }

    // Mongoose Duplicate key error
    if(error.code === 11000){
        const message = `Duplicate ${Object.keys(error.keyValue)} Entered`
        error = new ErrorHandler(message, 400)
    }
    // Wrong JsonWebToken
    if(error.name==="JsonWebTokenError"){
        const message= `Invalid Json Web Token` ;
        error = new ErrorHandler(message, 400)
    }
    // Expired JsonWebToken
    if(error.name==="TokenExpiredError"){
        const message= `Expired Json Web Token` ;
        error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({success:false,error:error.message});
};