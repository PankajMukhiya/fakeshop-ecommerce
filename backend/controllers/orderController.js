const catchAsycError = require("../middleware/catchAsycError");
const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

//CREATE NEW ORDER
exports.newOrder = catchAsycError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    userId: req.user._id, //whose are logged in
  });
  res.status(201).json({
    success: true,
    order,
  });
  console.log("created order");
});

//GET or DETAILSO OF  SINGLE ORDER
exports.getSingleOrder = catchAsycError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id)
  .populate(
    "userId",
    "name email "
  );
  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//GET LOGGED IN USER ORDERS
exports.myOrders = catchAsycError(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// GET ALL ORDERS : ADMIN ONLY
exports.getAllOrders = catchAsycError(async (req, res, next) => {
  const orders = await OrderModel.find();

  let totalAmount = 0;
  orders.forEach((o) => {
    totalAmount = totalAmount + o.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// UPDATE ORDER STATUS : ADMIN ONLY
exports.updateOrder = catchAsycError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already Delivered this Order", 400));
  }
  //for updating the stock quantity
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.productId, o.quantity); //in orderItems pruduct and quantity present
    });
  }

  //and now update the status : Processing to Delivered
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Order Status Updated Successfully...",
  });
});
// updateStock function
async function updateStock(id, quantity) {
  const product = await ProductModel.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// DELETE ORDER : ADMIN ONLY
exports.deleteOrder = catchAsycError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully...",
  });
});
