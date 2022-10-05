const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

//CREATE NEW ORDER
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//GET OR DETAILS OF SINGLE ORDER
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//GET LOGGEND IN USER ORDERS
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//GET ALL ORDERS: ADMIN ONLY
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

//UPDATE ORDER STATUS : ADMIN ONLY
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

//AND LASTLY EXPORT THE router AND import AND use THAT IN app.js
module.exports = router;

// const OrderRouter = router;
// module.exports = OrderRouter;
