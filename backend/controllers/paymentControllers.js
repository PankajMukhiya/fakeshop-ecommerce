const catchAsycError = require("../middleware/catchAsycError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// proceed to Payment
exports.proceedPayment = catchAsycError(async (req, res, next) => {
  // const myPayment = await stripe.customers.create({
  const { amount } = req.body;
  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    metadata: {
      company: "FakeShop",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

// send stipe api key not secret key
exports.sendStripeApiKey = catchAsycError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
