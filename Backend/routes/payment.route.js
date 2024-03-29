const express =require("express")
const {payment, newPaymentKey} = require('../controllers/payment.controller');
const router = express.Router();
const {islogged}=require("../middleware/auth");
// posting the payment details and getting  a key for it 
router.post("/payment/process",islogged,payment);
router.get("/stripeApiKey",islogged,newPaymentKey);
module.exports = router