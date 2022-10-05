const express = require("express");
const { proceedPayment, sendStripeApiKey } = require("../controllers/paymentControllers");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// payment route
router.route("/payment").post(isAuthenticatedUser, proceedPayment) /// --- /api/v1/process/payment
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey)

module.exports = router;