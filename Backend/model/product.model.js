const mongoose = require( 'mongoose' );

const prodschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    description:{
        type:String,
        required:[true, "Description is required"]
    },
    price:{
        type:String,
        required:[true, "Price is required"]
    },
    rating:{
        type:String,
        default:0
    },
    images:[
        {
            url:{
                type:String,
                required:true
            
            }
                
        }]
    ,
    category:{
        type:String,
        required:[true, "Category is required"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("product",prodschema)