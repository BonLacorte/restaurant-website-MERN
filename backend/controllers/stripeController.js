const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler')

// @desc Create stripe payment
// @route POST payment
// @access Private
const stripePayment = asyncHandler(async(req, res, next) => {
    try{
        stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                res.status(500).json(stripeErr);
                } else {
                res.status(200).json(stripeRes);
                }
            }
        );
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = {stripePayment};