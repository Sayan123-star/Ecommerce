// importing product model, error handler and apifeatures
const Product = require("../model/product.model");
const ErrorHandler = require("../util/errorhandler");
const CatchError = require("../middleware/catchAsync");
const ApiFeatures = require("../util/apiFeature");

//Route for Admin
const createnew = CatchError(async(req,res,next)=>{
    
    req.body.user = req.user._id
    const{name,description,price,category,rating}=req.body;
    
    const images = req.files.map(file => {
        const path = file.path.split('\\')[1];
        return { url: path };
    });

    const product = await Product.create({name,description,price,category,rating,images,user:req.user._id})
    try {
        res.status(201).json({message:"Product created",success:true,product})
    } catch (error) {
        return res.status(400).json({error:"Failed to create a new product"});
    }
})

// Route for admin as well as the customers
const getAllproducts= CatchError(async(req,res)=>{
    const resultPerpage = 8
    const productsCount= await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(),req.query).pagination(resultPerpage);
    const products = await apifeature.query;
    try {
        res.status(200).json({products,productsCount,resultPerpage});
    } catch (error) {
        return res.status(400).json({error:"Product cannot be retrieved"});
    }
})
// Searching products by name
const  searchProduct = CatchError(async(req,res)=>{
    const keyword = req.query.keyword;
    if(!keyword){
        return res.status(400).json({error:"Please send a query"})
    }
    try {
        const data =await Product.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
    });
    res.status(200).send(data);
    } catch (error) {
        res.ststus(500).json({error: "Internal Error Occured"})
    }
})

// Get all Products (Admin)
const getAdminproducts= CatchError(async(req,res)=>{
    const products = await Product.find()
    try {
        res.status(200).json({products});
    } catch (error) {
        return res.status(400).json({error:"Product cannot be retrieved"});
    }
})

//Update Route for Admin
const updateproduct = CatchError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    try {
        res.status(200).json({message:"Product updated",product})
    } catch (error) {
        res.status(400).json({error:"Internal Error occured"})
    }
})

// Delete Product route for Admin only
const deleterproduct = CatchError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    await product.deleteOne();
    try {
        res.status(200).json({message:"Product deleted"})
    } catch (error) {
        res.status(400).json({error:"Internal error"})
    }
})

//Get Product details
const getProductDetails = CatchError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    try {
        res.status(200).json({message:"Product found",product})
    } catch (error) {
        res.status(400).json({error:"Internal error"})
    }
})

module.exports={
    getAdminproducts,
    getAllproducts,
    createnew,
    updateproduct,
    deleterproduct,
    getProductDetails,
    searchProduct
}