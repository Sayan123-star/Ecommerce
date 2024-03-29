//Adding dependencies like express, deotenv, etc
const express = require("express");
const dotenv = require("dotenv");
const errorMid = require("./middleware/error");
const cors = require("cors");
// importing database file for  connecting to the MongoDB server
require("./util/dbconnect")
dotenv.config();
//Adding middlewares like express.json, cors, express static
const app = express();
app.use(express.json());
app.use(cors())
app.use('/uploads',express.static('uploads'))

PORT = process.env.PORT
//Importing the the route files to integrate the routes
const products = require("./routes/product.route")
const user = require("./routes/user.route");
const order = require("./routes/order.route");
const proPayment = require("./routes/payment.route");
const { searchProduct } = require("./controllers/product.controller");
//Applying  the routes to our application using .use() method
app.use('/api',products)
app.use('/api',user)
app.use('/api',order);
app.use('/api',proPayment);
app.use(errorMid);

// Get the route for search product
app.get('/search',searchProduct)

//Starting the server in the 5000 port
app.listen(5000,()=>{
    console.log(`Server has started on ${PORT}`);
})