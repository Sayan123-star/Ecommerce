const CatchError = require("../middleware/catchAsync");
// Importing stripe secret key and api key
const {STRIPE_SECRET_KEY, STRIPE_API_KEY}=require('../config')
const stripe = require("stripe")(STRIPE_SECRET_KEY)
// Making a payment gateway with stripe
const payment = CatchError(async(req,res,next)=>{
    const newPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: {
            company: "SuperMart"
        }
    })
    res.status(200).json({ success: true, client_secret: newPayment.client_secret })
})
// geting the api key for payment initialisation
const newPaymentKey = CatchError(async(req,res,next)=>{
    
    res.status(200).json({ stripeApiKey: STRIPE_API_KEY })
})
module.exports=({
    payment, newPaymentKey
})