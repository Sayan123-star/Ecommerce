// importing all the dependencies
const express = require("express");
const { getAllproducts, createnew, updateproduct, deleterproduct, getProductDetails, getAdminproducts } = require("../controllers/product.controller");
const { islogged, authAdinorUser } = require("../middleware/auth");
const upload = require("../middleware/imgupload");
const router = express.Router();
// creating routes for creating, updating and deleting products
// also creating routes for seeing products and product details
router.post("/createproduct",islogged,authAdinorUser("admin"),upload.array('images',5),createnew)
router.get("/products",getAllproducts);
router.get("/admin/products",islogged,authAdinorUser("admin"),getAdminproducts);
router.put("/admin/products/:id",islogged, authAdinorUser("admin"),updateproduct);
router.delete("/admin/product/:id",islogged,authAdinorUser("admin"),deleterproduct);
router.get("/products/:id",getProductDetails);

module.exports= router; 