const mongoose = require("mongoose");
const validator = require("validator");
const jwt =require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Name is required"]
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        validate: [validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type: String,
        required:[true,"Password is required"],
        select:false
    },
    picture:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password, 10)
})
// Json Web Token
userSchema.methods.getJWTToken =function(){
    // return jwt.sign({ id:this._id},JWT_SECRET,{expiresIn: JWT_EXPIRE});
    return jwt.sign({_id: this._id}, JWT_SECRET);
}
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


module.exports = mongoose.model("User",userSchema)