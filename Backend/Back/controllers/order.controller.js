// importing order model and errorHandler
const Order = require("../model/order.model");
const ErrorHandler = require("../util/errorhandler");
const CatchError = require("../middleware/catchAsync");
// Creating a new order by user id
const newOrder = CatchError(async (req,res,next)=>{
    const{shippingInfo,orderItems,paymentInfo,
        itemPrice,delevaryPrice,totalPrice}=req.body;
        const order = await Order.create({
            shippingInfo,orderItems,paymentInfo,
        itemPrice,delevaryPrice,totalPrice,paidDate:Date.now(),user:req.user._id
        })
    res.status(200).json({
        message:"New Order created",order
    })
})
// View order details details
const getOneOrder = CatchError(async (req,res,next)=>{
    const userOrder = await Order.findById(req.params.id).populate("user","name email");
    if(!userOrder){
        return next(new ErrorHandler("Order not found by the given id",404))
    }
    res.status(200).json({success:true,userOrder})
})
// view orders  of logged in user 
const getOrderofLogged = CatchError(async (req,res,next)=>{
    const loggedOrders = await Order.find({user:req.user._id})
    
    res.status(200).json({success:true,loggedOrders})
})
// Get all products --Admin  
const getAlloders = CatchError(async (req,res,next)=>{
    const allOrders = await Order.find()
    
    totalAmount = 0;
    allOrders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    })

    res.status(200).json({success:true,totalAmount,allOrders})
})
// Update order status -- Admin
const updateOrder = CatchError(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)
    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order has already been delivered",400))
    }
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave: false})

    res.status(200).json({success:true})
})
// Delete order --Admin
const deleteOrder = CatchError(async (req,res,next)=>{
    const delOrders = await Order.findById(req.params.id)
    
    if(!delOrders){
        return next(new ErrorHandler("Order not found",404))
    }
    await delOrders.deleteOne()
    res.status(200).json({success:true})
})
module.exports={
    newOrder,
    getOneOrder,
    getOrderofLogged,
    getAlloders,
    updateOrder,
    deleteOrder
}