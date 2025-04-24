const Rozarpay = require('razorpay');

const rozarpay = new Rozarpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})

module.exports = rozarpay;