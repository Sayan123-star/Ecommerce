const express = require("express");
const { newOrder, getOneOrder, getOrderofLogged, updateOrder, deleteOrder, getAlloders } = require("../controllers/order.controller");
const { islogged, authAdinorUser } = require("../middleware/auth");
const router = express.Router();
// creating the routes posting the orders, geting  all orders and getting a specific order, updating and deleting orders
router.post("/order",islogged,newOrder);
router.get("/order/admin/:id",islogged,getOneOrder);
router.get("/order/user",islogged,getOrderofLogged);
router.get("/order/admin",islogged,authAdinorUser("admin"),getAlloders);
router.put("/order/admin/update/:id",islogged,authAdinorUser("admin"),updateOrder);
router.delete("/order/admin/delete/:id",islogged,authAdinorUser("admin"),deleteOrder);

module.exports = router;