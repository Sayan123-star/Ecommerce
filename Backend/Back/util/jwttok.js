// Creating token and saving in Cookie

const { COOKIE_EXPIRE } = require("../config");

const sendToken = (user,statusCode, res)=>{
    const token = user.getJWTToken();
    res.status(statusCode).json({
        token,user
    })
}
module.exports= sendToken;