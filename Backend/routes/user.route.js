// importing all the dependencies
const express = require("express");
const { register, login, logout, getuser, updatePass, updateDetail, getalluser, getuserbyid, deleteUser, updateUser } = require("../controllers/user.controller");
const { islogged, authAdinorUser } = require("../middleware/auth");
const upload = require("../middleware/imgupload");
const router = express.Router();
// creating routes register, login, seeing user details,  logout 
// Seeing all users, updating and deleting the users
router.post("/register",upload.single('picture'),register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",islogged,getuser);
router.put("/updateuser",islogged,updatePass);
router.put("/updateuserdetail",islogged,updateDetail);
router.get("/allusers",islogged,authAdinorUser("admin"),getalluser);
router.get("/alluser/:id",islogged,authAdinorUser("admin"),getuserbyid);
router.put("/alluser/:id",islogged,authAdinorUser("admin"),updateUser);
router.delete("/alluser/:id",islogged,authAdinorUser("admin"),deleteUser);

module.exports = router;